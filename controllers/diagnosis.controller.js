const dirname = __dirname.replace('controllers', '');
const fs = require('fs');
const diagnosisService = require('../services/analysis/diagnosis.service');

module.exports.saveDiagnosis = async (req, res, next) => {
  const { doctorId, patientId } = req.body;
  const valid = doctorId && patientId && req.file;
  if (!valid) {
    return res.status(400).json({
      status: 400,
      success: false,
      error: 'Bad Request',
    });
  }
  // if (!(new Date(diagnosis.diagnosis_date).getTime())) { diagnosis.diagnosis_date = new Date() }
  // diagnosis.imagePath = localImagePath
  // image.mv(localImagePath)
  diagnosisService
    .diagnose(req.file.path, doctorId, patientId)
    // .then(resp => console.log(resp))
    // .catch(err => console.log(err))
    .then(resp => res.status(resp.status).json(resp))
    .catch(err => res.status(err.status).json(err));
};

module.exports.editDiagnosis = (req, res, next) => {
  const { diagnosisId } = req.params;
  const { newDiagnosis } = req.body;
  console.log(diagnosisId)
  const valid = diagnosisId && newDiagnosis;
  if (!valid) {
    return res.status(400).json({
      status: 400,
      success: false,
      error: 'Bad Request',
    });
  }
  diagnosisService
    .editDiagnosis(diagnosisId, newDiagnosis)
    .then(resp => res.status(resp.status).json(resp))
    .catch(err => res.status(err.status).json(err));
};

module.exports.deleteDiagnosis = (req, res, next) => {
  const { diagnosisId } = req.params;
  const valid = diagnosisId;
  if (!valid) {
    return res.status(400).json({
      status: 400,
      success: false,
      error: 'Bad Request',
    });
  }
  diagnosisService
    .deleteDiagnosis(diagnosisId)
    .then(resp => res.status(resp.status).json(resp))
    .catch(err => res.status(err.status).json(err));
};
