const jwt = require('jsonwebtoken');
const customer = require('../models/User');

//Guard

module.exports.verifyUser = function(req,res,next){
    console.log(req.headers.authorization)
    try{
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, 'anysecretkey');
        customer.findOne({_id :data.YourId})
        .then(function(result){
            req.userData = result;
            next();
        })

        .catch(function(e){
            res.status(401).json({error : e})
        })

    }

    catch(e)
    {
        res.status(401).json({error:e})
    }
}
module.exports.verifyAdmin = function(req,res,next){
    if (!req.userData){
        return res.status(401).json({message:"unauthorized!"})
    }
    else if(req.userData.userType!=='Admin'){
        return res.status(401).json({message : "Unauthorized!!"})

    }
        next();
}

module.exports.verifyBuyer =  function(req, res, next){
    if(!req.userData){
        return res.status(401).json({message : "Unauthorized!!"})
    }
    else if(req.userData.userType!=='Buyer'){
        return res.status(401).json({message : "Unauthorized!!"})
    }
    next();
}