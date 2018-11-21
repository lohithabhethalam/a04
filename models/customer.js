/**
 * Customer Scheme to store customer details
 * @author Razeena Rao
 */
const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({

  _id: { type: Number, required: true },
  name: {
    type: String,
    required: true,
    default: 'abcd'
  },
  Dob: {
    type: Date,
    required: true,
    default: ''
  },
  email: {
    type: String,
    required: true,
    default: ''
  },
  ph_no: {
    type:Number,
    required: true,
    default: 1
  }
})
module.exports = mongoose.model('Customer', customerSchema)
