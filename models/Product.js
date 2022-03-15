const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName:{
        type:String},
    productCategory:{type:String, 
    enum:['Accessories','Beverages','Grocery','Default' ]
},
    productDescription:{type:String},
   price:{type:String},
   pimage:{type:String},
})

const product = mongoose.model('Product',productSchema) //Here the table name is product

module.exports=product  // to export the  Customer file








