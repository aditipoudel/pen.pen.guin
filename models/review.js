const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 1
    }
})

const comment = mongoose.model('Comment',commentSchema) //Here the table name is Customers


module.exports=comment  // to export the  Customer file