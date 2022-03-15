const express = require('express')
const commentModel = require('../models/comment')
const auth = require("../middleware/auth.js")

const router= new express.Router()


router.post('/product/comment/:id',auth.verifyUser,auth.verifyBuyer, async function(req,res){
    const product = req.params.id;
    const user = req.userData._id;

    const data = new commentModel({
        comment: req.body.comment,
        rating: req.body.rating,
        product: product,
        user: user
    })
    await data.save()
    res.json({ 
        success: "true",
        message: "Comment inserted" 
    })
})

router.get('/product/comment/:id', async function(req,res){
    const product = req.params.id;
    const data = await commentModel.find({product: product}).populate("user")
    res.json({ 
        success: "true",
        message: "Comment inserted",
        data: data 
    })
})
// router.put("/order/cancel/:id", async function(req,res){
//     // await Comment.updateOne({
//     //     _id: req.params.id
//     // },{
//     //     status: "canceled"
//     // })
   
 
//     res.json({
//         message: "Comment Deleted",
//         success: true,
//     })
//     res.end() 
// })





module.exports=router