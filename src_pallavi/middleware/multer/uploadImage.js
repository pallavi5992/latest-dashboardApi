const multer = require('multer')
const path = require('path')
//Image upload function
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
       // cb(null, file.originalname);
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (file.mimetype !== 'image/jpeg' || file.mimetype !== 'image/jpg' || file.mimetype !== 'image/png') {
            callback(null, true)
        } else {
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})


module.exports = upload
