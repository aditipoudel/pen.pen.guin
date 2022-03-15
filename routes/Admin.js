const express = require('express');
const customer = require('../models/User')
const router = express.Router();

/* for admin*/
// router.get('/admin/show',  function(req,res){
      
//     customer.find()
//     .then(function(data){
//         res.status(201).json({success:"true", data:data});
//     })
//     .catch(function(err){
//         res.status(500).json()
//     })
// })

// router.get('/admin/show/:id',  function(req,res){
      
//     customer.find({_id:req.params.id})
//     .then(function(data){
//         res.status(201).json({success:"true", data:data});
//     })
//     .catch(function(err){
//         res.status(500).json()
//     })
// })
// router.get('/admin/:id',  function(req,res){
      
//     customer.find({_id:req.params.id})
//     .then(function(data){
//         res.status(201).json({success:"true", data:data});
//     })
//     .catch(function(err){
//         res.status(500).json()
//     })
// })

// router.get('/admin/users',  function(req,res){
      
//     customer.find()
//     .then(function(data){
//         res.status(201).json({success:"true", data:data});
//     })
//     .catch(function(err){
//         res.status(500).json()
//     })
// })


router.route('/users')

.get((req,res,next)=>{

    customer.find()

    .then(users=>{

        res.json(users);

    }).catch(next);

})


module.exports = router;