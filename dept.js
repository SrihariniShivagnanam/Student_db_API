const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
  },
  description: {
    type: String,
    required: false,
  },
});
const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;