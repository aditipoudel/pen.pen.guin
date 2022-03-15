const mongoose = require('mongoose')

const checkoutSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    dateCreated:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        enum:["pending", "completed", "canceled"],
        default: "pending"
    },
    order:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"  
        }
    ],
    orderDate: String,
    returningDate: String,
    fullname: String,
    number: String ,
    shippingAddress: String
});


const checkout = mongoose.model('checkout', checkoutSchema)
module.exports = checkout