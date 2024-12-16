const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


const uploadFiles = upload.fields([
  { name: 'logo', maxCount: 1 },  
  { name: 'banner', maxCount: 1 }, 
]);


module.exports = uploadFiles;
