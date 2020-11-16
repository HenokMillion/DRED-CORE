const mongoose = require('mongoose');
const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const fs = require('fs');
const tfnode = require('@tensorflow/tfjs-node');
const Diagnosis = require('../../models/diagnosis.model');

let model = null;
module.exports.diagnose = async (imagePath, doctorId, patientId) => {
  // if (!model) {
  //     model = await tf.loadLayersModel('https://srv-store2.gofile.io/download/jFOoxc/model.json')
  //     console.log(model.summary())
  // }
  if (!model) {
    model = await tfnode.loadLayersModel(
      `file://${__dirname}/model/model.json`,
    );
  }
  const DIAGNOSIS_CLASSES = {
    0: "NO DR"
  }
  const image = fs.readFileSync(imagePath);
  const imagePixels = tfnode.node.decodeImage(image);
  const input = tf.zeros([1, 224, 224, 3]);
  input[0] = imagePixels;
  // const smallImg = imagePixels.resizeBilinear(imagePixels, ).toFloat().div(tf.scalar(255)).expandDims()
  const classification = await model.predict(input, { batchSize: 4 });
  // console.log(image)
  const uploadFile = fs.writeFileSync(imagePath.split('/')[3] + '.jpg', fs.readFileSync(image), (err) => { if (err) console.log(err) });
  console.log(uploadFile)
  // console.log(classification);
  const currentDate = new Date();
  return saveDiagnosis({
    diagnosisId: currentDate.getTime(),
    imagePath,
    severity: parseInt(classification.scopeId),
    doctorId,
    patientId,
    diagnosis_date: currentDate,
  });
};

function saveDiagnosis(diagnosis) {
  return new Promise((succeed, fail) => {
    Diagnosis.create(diagnosis)
      .then(data =>
        succeed({
          status: 200,
          success: true,
          data,
        }),
      )
      .catch(err =>
        fail({
          status: 500,
          success: false,
          error: err,
        }),
      );
  });
}

module.exports.editDiagnosis = (id, diagnosis) =>
  new Promise((succeed, fail) => {
    Diagnosis.findByIdAndUpdate(id, diagnosis, (err, res) => {
      if (err) {
        fail({
          status: 500,
          success: false,
          error: err,
        });
      } else {
        if (!res) {
          return fail({
            status: 500,
            success: false,
            error: 'diagnosis not found',
          });
        }
        succeed({
          status: 200,
          success: true,
          data: res,
        });
      }
    });
  });

module.exports.deleteDiagnosis = id =>
  new Promise((succeed, fail) => {
    Diagnosis.findByIdAndRemove(id, (err, data) => {
      if (err) {
        fail({
          status: 500,
          success: false,
          error: err,
        });
      } else {
        if (!data) {
          return fail({
            status: 500,
            success: false,
            error: 'diagnosis not found',
          });
        }
        succeed({
          status: 200,
          success: true,
          data: 'successfully removed diagnosis record',
        });
      }
    });
  });

// tensorflowjs_converter --input_format keras \
//                        services/analysis/model.h5 \
//                        services/analysis
