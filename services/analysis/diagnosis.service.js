const mongoose = require('mongoose');
const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const fs = require('fs');
const tfnode = require('@tensorflow/tfjs-node');
const Diagnosis = require('../../models/diagnosis.model');
const Patient = require('../../models/user/patient.model');
const { fail } = require('assert');
const mailUtil = require('../../utilities/mail.utility')
const Doctor = require('../../models/user/doctor.model')
const patientService = require('../storage/patient.service')

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
  console.log('pre-classification: ', input)
  const classification = await model.predict(input, { batchSize: 1 });
  const uploadFile = fs.writeFileSync(imagePath.split('/')[3] + '.jpg', fs.readFileSync(imagePath), (err) => { if (err) console.log(err) });
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
  return new Promise(async (succeed, fail) => {
    await Patient.findOneAndUpdate({
      patientId: diagnosis.patientId
    }, {
      $push: { diagnoses: diagnosis }
    })
    const doctor = await Doctor.findById(diagnosis.doctorId)
    const patient = await patientService.getPatient(diagnosis.patientId)
    Diagnosis.create(diagnosis)
      .then(async data => {
        mailUtil.sendReport({
          diagnosis: data,
          doctor: doctor,
          patient: patient.data,
          attachement: fs.readFileSync(diagnosis.imagePath)
        })
          .then(_data => {
            console.log('_DATA: ', _data)
          })
          .catch(_err => console.error('_ERR: ', _err))
          .finally(() => {
            succeed({
              status: 200,
              success: true,
              data,
            })
          })
      })
      .catch(err =>
        fail({
          status: 500,
          success: false,
          error: err,
        }),
      );
  });
}

module.exports.editDiagnosis = (id, diagnosis) => {
  if (!mongoose.isValidObjectId(id)) {
    return new Promise((success, fail) => fail({
      status: 404,
      success: false,
      error: "Not found",
    }))
  }
  const updatedDiagnosis = { ...diagnosis }
  delete updatedDiagnosis.comment
  const bulk = Diagnosis.collection.initializeUnorderedBulkOp()
  if (diagnosis.comment) {
    diagnosis.comment.timestamp = new Date().getTime()
    bulk.find({
      _id: mongoose.Types.ObjectId(id),
    })
      .update({
        $push: { comment: diagnosis.comment }
      })
  }
  bulk.find({
    _id: mongoose.Types.ObjectId(id)
  }).update({ '$set': updatedDiagnosis });
  return new Promise(async (succeed, fail) => {
    bulk.execute()
      .then(data => {
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
          data: 'diagnosis updated successfully',
        });
      })
      .catch(err => {
        console.log(err)
        fail({
          status: 500,
          success: false,
          error: err,
        });
      })
  });
}

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
