const mongoose = require('mongoose');

const repairSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Customer'
    },
    device: {
      brand: { type: String, required: true },
      model: { type: String, required: true },
      serialNumber: { type: String },
      condition: { type: String, required: true }
    },
    issue: {
      description: { type: String, required: true },
      type: { 
        type: String, 
        required: true,
        enum: ['Screen', 'Battery', 'Camera', 'Speaker', 'Microphone', 'Charging Port', 'Software', 'Other']
      }
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Diagnosed', 'In Progress', 'Waiting Parts', 'Completed', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    diagnosis: {
      notes: { type: String },
      estimatedCost: { type: Number },
      estimatedTime: { type: String }
    },
    parts: [{
      part: { type: mongoose.Schema.Types.ObjectId, ref: 'Part' },
      quantity: { type: Number },
      cost: { type: Number }
    }],
    cost: {
      parts: { type: Number, default: 0 },
      labor: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    },
    dates: {
      received: { type: Date, default: Date.now },
      diagnosed: { type: Date },
      started: { type: Date },
      completed: { type: Date },
      delivered: { type: Date }
    },
    notes: { type: String }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Repair', repairSchema); 