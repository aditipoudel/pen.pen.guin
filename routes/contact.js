const express = require('express');
const contact = require('../models/contact');

const router = new express.Router()


router.post('/contact', function(req,res){
    const data = new contact({
        contactname:req.body.contactname,
        email: req.body.email,
        number : req.body.number,
        message :req.body.message
     
    })
    data.save()
    .then(function(result){
        res.status(201).json({  success:"true", message:" message sent"})
    })
    .catch(function(err){
        res.status(500).json({message:err})

    })
})

router.get('/contact', function (req, res) {

    contact.find()
    .then(function(result){
        res.status(201).json({  success:"true", message:" message preview",data:result})
    })
    .catch(function(err){
        res.status(500).json({message:err})
       })
})
router.delete("/contact/delete/:id", async function(req,res){

    await contact.deleteOne({  
        _id: req.params.id
    },{
        status: "Delete"
    })
 
    res.json({
        message: "Feedback deleted Delete",
        success: true,
    })
    res.end() 
})

module.exports = router;