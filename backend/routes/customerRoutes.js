const express = require('express');
const router = express.Router();
const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  searchCustomers
} = require('../controllers/customerController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createCustomer)
  .get(protect, getCustomers);

router.route('/search')
  .get(protect, searchCustomers);

router.route('/:id')
  .get(protect, getCustomerById)
  .put(protect, updateCustomer)
  .delete(protect, deleteCustomer);

module.exports = router; 