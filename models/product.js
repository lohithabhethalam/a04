/** 
*  Product model
*  Describes the characteristics of each attribute in a product resource.
*
* @author  Karthik Reddy Muthyala <S533627@nwmissouri.edu> 
*
*/
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

  _id: { type: Number, required: true },
  productKey: {
    type: String,
    required: true,
    unique: true,
    default: 'product'
  },
  description: {
    type: String,
    required: false,
    default: 'description'
  },
  unitPrice: {
    type: Number,
    required: true,
    default: 9.99,
    min: 0,
    max: 100000
  },
  type: {
      required: true,
      default: "Andriod"
  }
})
module.exports = mongoose.model('Product', ProductSchema)
