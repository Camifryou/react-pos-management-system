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
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createRepair)
  .get(protect, getRepairs);

router.route('/:id')
  .get(protect, getRepairById);

router.route('/:id/status')
  .put(protect, updateRepairStatus);

router.route('/:id/parts')
  .put(protect, addRepairParts);

router.route('/:id/diagnosis')
  .put(protect, updateRepairDiagnosis);

module.exports = router; 