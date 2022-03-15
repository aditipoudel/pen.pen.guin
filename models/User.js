const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String },
    gender: { type: String },
    email: {
        type: String,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    address: { type: String },
    age: { type: String },
    profile_pic: { type: String },
    userType: {
        type: String,
        enum: ['Admin', 'Buyer'],
        default: 'Buyer'
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});

 const customer = mongoose.model('Customer', customerSchema) //Here the table name is Customers

 module.exports = customer  // to export the  Customer file



