const express = require('express')
const customer = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = new express.Router() //bulk export of the route
const upload = require('../middleware/fileupload')
const { verifyBuyer, verifyUser } = require('../middleware/auth')


// router.post('/user/register',async function(req,res){

//insert -post

router.post('/user/register', function (req, res) {

    const username = req.body.username;
    const em = req.body.email;
    const pw = req.body.password;

    bcrypt.hash(pw, 10, function (err, hash1) {
        const data = new customer({
            username: username,
            email: em,
            password: hash1
        })
        // var data = new customer(req.body);
        data.save()
            .then(function (result) {
                res.status(201).json({
                    message: "Registration sucessful!"

                })
            })
            .catch(function (e) {
                res.status(500).json({
                    message: e
                })
            })
    })


})

router.put('/user/update', upload.single('myimage'), function (req, res) {
    const id = req.body._id;
    const price = req.body.price;
    customer.updateOne({
        _id: id12
    }, {
        profile_pic: profile_pic
    })
        .then(function (result) {
            res.status(201).json({
                message: "Profile picture sucessful"
            })

        }).catch(function (e) {
            res.status(500).json({
                message: err
            })

        });
})

// const customerModel = new CustomerModel1(req.body)
// await customerModel.save()
// res.end()



//now for login system

router.post('/user/login', function (req, res) {
    console.log(req.body)
    //starting with username and password from client
    const email = req.body.email;
    const password = req.body.password;    //to check if the username exists

    customer.findOne({
        email: email
    }) // in second username the name of the user is stored 
        .then(function (data) { //then the value gets stored in variable data  if user exists
            if (data == null) {
                return res.status(403).json({
                    message: "Invalid credentials"
                }) // if the data is not found it means invalid user
            } // if the user is valid       
            bcrypt.compare(password, data.password, function (err, result) { // now comparing the stored password with the given password
                if (result === false) { //if the password is incorrect
                    return res.status(403).json({
                        message: "Invalid credentials"
                    })
                }   //if both credentials are correct
                const token = jwt.sign({
                    YourId: data._id
                }, 'anysecretkey'); //to great token
                res.status(200).json({
                    t: token,
                    userType:data.userType,
                    message: "Authentication Success!",
                    userID: data._id
                })
            })
        })
        .catch()
})
// after auth upload.single('myimage'),
router.post('/profile/uploadimage', verifyUser, verifyBuyer,upload.single('myimage'),  function (req, res) {
    // res.send("profile upload")
    // res.end()
    // if (req.file == undefined) {
    //     return res.status(400).json({ message: "upload" })
    // }
    
    const profile_pic=req.file.filename
    
    const data = customer.updateOne({_id: req.userData._id},{
        // profile_pic: req.file.filename,
    
        profile_pic
    })
        .then(function () {
            //success
            console.log("Success")
        })
        .catch(function () {
            //error
        })
})


router.post('/profile/upload', verifyUser, verifyBuyer,  function (req, res) {
    const username=req.body.username;
    const address=req.body.address;
    const age=req.body.age;
    const gender=req.body.gender;

    
    const data = customer.updateOne({_id: req.userData._id},{
        // profile_pic: req.file.filename,
        username,
        address,
        age, 
        gender,

    })
        .then(function () {
            //success
            console.log("Success")
        })
        .catch(function () {
            //error
        })
})
router.post("/user/addtocart/:productId", verifyUser, verifyBuyer, async function (req, res) {
    try {
        console.log("in cart")
        const id = req.params.productId
        const user = req.userData._id
        const serverUser = await customer.findById(user._id)
        const updatedCart = [...serverUser.cart]
        const itemIndex = updatedCart.findIndex(


            item => {
                return (item.toString() === id)
            }
        )
        if (itemIndex === -1) {
            updatedCart.push(id)
            serverUser.cart = updatedCart
        }
        console.log(await serverUser.save())
        res.json({
            // changes made here for  android 
            success:true,
            //ends here
            message: "Data saved"
        })
        res.end()
    } catch (error) {
        console.log(error)

    }
})
//to show the cart in the Front-end
router.get("/user/cart", verifyUser, verifyBuyer, async function (req, res) {
    try {
        const user = req.userData._id

        const serverUser = await customer.findById(user).populate("cart")
        console.log(serverUser.cart)
        res.json({
            // changes made here for  android 
            success:true,
            //ends here
            data: serverUser.cart
        })
        res.end()
    } catch (error) {
        console.log(error)

    }
})
router.delete("/user/deletecart/:productId", verifyUser, verifyBuyer, async function (req, res) {
    try {
        console.log("in cart")
        const id = req.params.productId
        const user = req.userData._id
        const serverUser = await customer.findById(user._id)
        let updatedCart = [...serverUser.cart]
        const itemIndex = updatedCart.findIndex(


            item => {
                return (item.toString() === id)
            }
        )
        if (itemIndex !=-1) {
             updatedCart.splice(itemIndex,1)
            serverUser.cart = updatedCart
        }
        console.log(await serverUser.save())
        res.json({
            // changes made here for  android 
            success:true,
            //ends here
            message: "Deleted from the cart"
        })
        res.end()
    } catch (error) {
        console.log(error)

    }
})


router.get('/user/show', function (req, res) {

    customer.find()
        .then(function (data) {
            res.status(201).json({ success: "true", data: data });
        })
        .catch(function (err) {
            res.status(500).json()            
        })
})

router.get('/user/profile',  verifyUser, verifyBuyer, function (req, res) {

    customer.findOne({ _id: req.userData._id})
        .then(function (data) {
            console.log("success")
            res.status(201).json({ success: "true", data: data });
        })
        .catch(function (err) {
            res.status(500).json()
        })
})

// router.get('/profile/', function (req, res) {

//     customer.find({ _id: req.params.id })
//         .then(function (data) {
//             res.status(201).json({ success: "true", data: data });
//         })
//         .catch(function (err) {
//             res.status(500).json()
//         })
// })

module.exports = router // to export router