const mongoose = require('mongoose');
const db = require('../db')

// Define schema user
const userSchema = new mongoose.Schema(
  {
    // id: { type: String, required: true, unique: true },
    name: String
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = db.model('user', userSchema);