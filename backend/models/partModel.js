const mongoose = require('mongoose');

const partSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    type: {
      type: String,
      required: true,
      enum: ['Screen', 'Battery', 'Camera', 'Speaker', 'Microphone', 'Charging Port', 'Other']
    },
    compatibility: [{
      brand: { type: String },
      model: { type: String }
    }],
    sku: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      purchase: { type: Number, required: true },
      sale: { type: Number, required: true }
    },
    stock: {
      current: { type: Number, default: 0 },
      minimum: { type: Number, default: 1 }
    },
    supplier: {
      name: { type: String },
      contact: { type: String },
      code: { type: String }
    },
    location: {
      type: String
    },
    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Part', partSchema); 