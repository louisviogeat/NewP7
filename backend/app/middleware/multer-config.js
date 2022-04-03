const multer = require('multer');


const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//const MAX_SIZE = 200000;

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        const nameWithoutExtension = name.split(`.${extension}`);
        callback(null, nameWithoutExtension[0] + '-' + Date.now() + '.' + extension);
    }
});


module.exports = multer({ storage: storage }).single('file');