const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  accessCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the `updatedAt` field on each save
urlSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
