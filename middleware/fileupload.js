const multer = require('multer');
const storage = multer.diskStorage({
 //(Where to store files)
destination: function(req,file,cb){
    cb(null,'./files') //  here files is the foldername
},
filename: function(req,file, cb){
    cb(null, Date.now() + file.originalname)

}
})

const filter = function(req,file,cb){
    if(file.mimetype == 'image/png' || file.mimetype=='image/jpg'    || file.mimetype=='image/jpeg'    
    ){
        cb(null,true)
    }
    else{
        cb(null, false)
    }
}


const upload = multer({ 
    
    // destination + validation
storage : storage, fileFilter: filter});




module.exports = upload;

