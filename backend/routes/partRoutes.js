const express = require('express');
const router = express.Router();
const {
  createPart,
  getParts,
  getPartById,
  updatePart,
  deletePart,
  updatePartStock,
  searchParts,
  getLowStockParts
} = require('../controllers/partController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createPart)
  .get(protect, getParts);

router.route('/search')
  .get(protect, searchParts);

router.route('/low-stock')
  .get(protect, getLowStockParts);

router.route('/:id')
  .get(protect, getPartById)
  .put(protect, updatePart)
  .delete(protect, deletePart);

router.route('/:id/stock')
  .put(protect, updatePartStock);

module.exports = router; 