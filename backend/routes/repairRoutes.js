const express = require('express');
const router = express.Router();
const {
  createRepair,
  getRepairs,
  getRepairById,
  updateRepairStatus,
  addRepairParts,
  updateRepairDiagnosis
} = require('../controllers/repairController');

router.route('/')
  .post(createRepair)
  .get(getRepairs);

router.route('/:id')
  .get(getRepairById);

router.route('/:id/status')
  .put(updateRepairStatus);

router.route('/:id/parts')
  .put(addRepairParts);

router.route('/:id/diagnosis')
  .put(updateRepairDiagnosis);

module.exports = router; 