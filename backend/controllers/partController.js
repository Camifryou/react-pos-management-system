const Part = require('../models/partModel');
const asyncHandler = require('express-async-handler');

// @desc    Create new part
// @route   POST /api/parts
// @access  Private
const createPart = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    type,
    compatibility,
    sku,
    price,
    stock,
    supplier,
    location,
    notes
  } = req.body;

  const partExists = await Part.findOne({ sku });

  if (partExists) {
    res.status(400);
    throw new Error('Part with this SKU already exists');
  }

  const part = await Part.create({
    name,
    description,
    type,
    compatibility,
    sku,
    price,
    stock,
    supplier,
    location,
    notes
  });

  if (part) {
    res.status(201).json(part);
  } else {
    res.status(400);
    throw new Error('Invalid part data');
  }
});

// @desc    Get all parts
// @route   GET /api/parts
// @access  Private
const getParts = asyncHandler(async (req, res) => {
  const parts = await Part.find({});
  res.json(parts);
});

// @desc    Get part by ID
// @route   GET /api/parts/:id
// @access  Private
const getPartById = asyncHandler(async (req, res) => {
  const part = await Part.findById(req.params.id);

  if (part) {
    res.json(part);
  } else {
    res.status(404);
    throw new Error('Part not found');
  }
});

// @desc    Update part
// @route   PUT /api/parts/:id
// @access  Private
const updatePart = asyncHandler(async (req, res) => {
  const part = await Part.findById(req.params.id);

  if (part) {
    part.name = req.body.name || part.name;
    part.description = req.body.description || part.description;
    part.type = req.body.type || part.type;
    part.compatibility = req.body.compatibility || part.compatibility;
    part.price = req.body.price || part.price;
    part.stock = req.body.stock || part.stock;
    part.supplier = req.body.supplier || part.supplier;
    part.location = req.body.location || part.location;
    part.notes = req.body.notes || part.notes;

    const updatedPart = await part.save();
    res.json(updatedPart);
  } else {
    res.status(404);
    throw new Error('Part not found');
  }
});

// @desc    Delete part
// @route   DELETE /api/parts/:id
// @access  Private
const deletePart = asyncHandler(async (req, res) => {
  const part = await Part.findById(req.params.id);

  if (part) {
    await part.remove();
    res.json({ message: 'Part removed' });
  } else {
    res.status(404);
    throw new Error('Part not found');
  }
});

// @desc    Update part stock
// @route   PUT /api/parts/:id/stock
// @access  Private
const updatePartStock = asyncHandler(async (req, res) => {
  const { quantity, type } = req.body; // type can be 'add' or 'remove'
  const part = await Part.findById(req.params.id);

  if (part) {
    if (type === 'remove' && part.stock.current < quantity) {
      res.status(400);
      throw new Error('Insufficient stock');
    }

    part.stock.current = type === 'add' 
      ? part.stock.current + quantity
      : part.stock.current - quantity;

    const updatedPart = await part.save();
    res.json(updatedPart);
  } else {
    res.status(404);
    throw new Error('Part not found');
  }
});

// @desc    Search parts
// @route   GET /api/parts/search
// @access  Private
const searchParts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: 'i' } },
          { sku: { $regex: req.query.keyword, $options: 'i' } },
          { type: { $regex: req.query.keyword, $options: 'i' } }
        ]
      }
    : {};

  const parts = await Part.find({ ...keyword });
  res.json(parts);
});

// @desc    Get low stock parts
// @route   GET /api/parts/low-stock
// @access  Private
const getLowStockParts = asyncHandler(async (req, res) => {
  const parts = await Part.find({
    $expr: {
      $lte: ['$stock.current', '$stock.minimum']
    }
  });
  res.json(parts);
});

module.exports = {
  createPart,
  getParts,
  getPartById,
  updatePart,
  deletePart,
  updatePartStock,
  searchParts,
  getLowStockParts
}; 