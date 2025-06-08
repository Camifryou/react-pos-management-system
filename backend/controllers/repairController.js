const Repair = require('../models/repairModel');
const Customer = require('../models/customerModel');
const Part = require('../models/partModel');
const asyncHandler = require('express-async-handler');

// @desc    Create new repair
// @route   POST /api/repairs
// @access  Private
const createRepair = asyncHandler(async (req, res) => {
  const {
    customerId,
    device,
    issue,
    technicianId
  } = req.body;

  const repair = await Repair.create({
    customer: customerId,
    device,
    issue,
    technician: technicianId
  });

  if (repair) {
    // Add repair to customer's repairs array
    await Customer.findByIdAndUpdate(
      customerId,
      { $push: { repairs: repair._id } }
    );

    res.status(201).json(repair);
  } else {
    res.status(400);
    throw new Error('Invalid repair data');
  }
});

// @desc    Get all repairs
// @route   GET /api/repairs
// @access  Private
const getRepairs = asyncHandler(async (req, res) => {
  const repairs = await Repair.find({})
    .populate('customer', 'name phone email')
    .populate('technician', 'name')
    .populate('parts.part');
  res.json(repairs);
});

// @desc    Get repair by ID
// @route   GET /api/repairs/:id
// @access  Private
const getRepairById = asyncHandler(async (req, res) => {
  const repair = await Repair.findById(req.params.id)
    .populate('customer', 'name phone email')
    .populate('technician', 'name')
    .populate('parts.part');

  if (repair) {
    res.json(repair);
  } else {
    res.status(404);
    throw new Error('Repair not found');
  }
});

// @desc    Update repair status
// @route   PUT /api/repairs/:id/status
// @access  Private
const updateRepairStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const repair = await Repair.findById(req.params.id);

  if (repair) {
    repair.status = status;
    
    // Update corresponding date based on status
    switch (status) {
      case 'Diagnosed':
        repair.dates.diagnosed = Date.now();
        break;
      case 'In Progress':
        repair.dates.started = Date.now();
        break;
      case 'Completed':
        repair.dates.completed = Date.now();
        break;
      case 'Delivered':
        repair.dates.delivered = Date.now();
        break;
    }

    const updatedRepair = await repair.save();
    res.json(updatedRepair);
  } else {
    res.status(404);
    throw new Error('Repair not found');
  }
});

// @desc    Add parts to repair
// @route   PUT /api/repairs/:id/parts
// @access  Private
const addRepairParts = asyncHandler(async (req, res) => {
  const { parts } = req.body;
  const repair = await Repair.findById(req.params.id);

  if (repair) {
    // Add parts and update costs
    repair.parts = parts;
    
    // Calculate parts cost
    const partsCost = parts.reduce((acc, item) => {
      return acc + (item.cost * item.quantity);
    }, 0);
    
    repair.cost.parts = partsCost;
    repair.cost.total = partsCost + repair.cost.labor;

    // Update parts inventory
    for (const item of parts) {
      await Part.findByIdAndUpdate(
        item.part,
        { $inc: { 'stock.current': -item.quantity } }
      );
    }

    const updatedRepair = await repair.save();
    res.json(updatedRepair);
  } else {
    res.status(404);
    throw new Error('Repair not found');
  }
});

// @desc    Update repair diagnosis
// @route   PUT /api/repairs/:id/diagnosis
// @access  Private
const updateRepairDiagnosis = asyncHandler(async (req, res) => {
  const { diagnosis } = req.body;
  const repair = await Repair.findById(req.params.id);

  if (repair) {
    repair.diagnosis = diagnosis;
    const updatedRepair = await repair.save();
    res.json(updatedRepair);
  } else {
    res.status(404);
    throw new Error('Repair not found');
  }
});

module.exports = {
  createRepair,
  getRepairs,
  getRepairById,
  updateRepairStatus,
  addRepairParts,
  updateRepairDiagnosis
}; 