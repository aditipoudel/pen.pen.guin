const express = require('express')
const productModel = require('../models/Product')
const upload = require('../middleware/fileupload')

const router = new express.Router()

const auth = require('../middleware/auth') //using middleware auth to restrict anyone delete/update

router.post('/product/insert', upload.single('product_image'), function (req, res) {

    const id = req.body.id;
    const price = req.body.price;
    const productName = req.body.productName;
    const productDescription = req.body.productDescription;
    const productCategory = req.body.productCategory;
    const image = req.file.filename;
    console.log(image)
    //auth.verifyUser,auth.verifyAdmin, after /insert', upload.single

    const data = new productModel({
        price: price, productDescription: productDescription,
        productCategory: productCategory, productName: productName, pimage: image
    })
    data.save()
        .then(function (result) {
            res.status(201).json({ success: "true", message: "Product inserted" })
        })
        .catch(function (err) {
            res.status(500).json({ message: err })

        })
})

router.put('/product/update/:id', function (req, res) {
    /*auth.verifyUser,auth.verifyAdmin, */
    console.log(req.params.id)
    const id = req.body.id; //id2 is for postman
    const price = req.body.price;
    const productName = req.body.productName;
    const productDescription = req.body.productDescription;
    const productCategory = req.body.productCategory;
    productModel.updateOne({ _id: id }, {
        price: price,
        productName: productName,
        productDescription: productDescription,
        productCategory: productCategory
    })
        .then(function (result) {

            res.status(201).json({success:"true" ,message: "Product inserted",data:data});

        })
        .catch(function (err) {
            res.status(500).json()
        })
})

//to delete product

router.delete('/product/delete/:id', function (req, res) {
    // const id = req.body.id;  //request from form
    const id = req.params.id; //for request that comes from URL

    productModel.deleteOne({ _id: id })
        .then(
            res.status(201).json({ success: "true", message: "Product deleted" })
        )
        .catch(  res.status(500).json())
})

//to show products
router.get('/product/show', function (req, res) {

    productModel.find()
        .then(function (data) {
            res.status(201).json({ success: "true", data: data });
        })
        .catch(function (err) {
            res.status(500).json()
        })
})

//  to show products
router.get('/product/show/:id', function (req, res) {

    productModel.findOne({ _id: req.params.id })
        .then(function (data) {
            res.status(201).json({ success: "true", data: data });
        })
        .catch(function (err) {
            res.status(500).json()
        })
})

router.get('/product/showcategory/:filter', function (req, res) {

    productModel.findAll({ productCategory: req.params.filter })
        .then(function (data) {
            res.status(201).json({ success: "true", data: data });
        })
        .catch(function (err) {
            res.status(500).json()
        })
})


module.exports = router



