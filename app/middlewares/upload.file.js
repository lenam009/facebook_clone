const multer = require('multer');

const getTypeOfFile = (file) => {
    if (file.mimetype.includes('image')) {
        return file.mimetype.substring(file.mimetype.indexOf('/') + 1);
    } else if (file.mimetype.includes('video')) {
        return 'mp4';
    } else {
        return '';
    }
};

const getTitleOfFile = (file) => {
    if (file.mimetype.includes('image')) {
        return 'image';
    } else if (file.mimetype.includes('video')) {
        return 'video';
    } else {
        return '';
    }
};

const getDestinationOfFile = (req) => {
    if (req.headers.target_type === 'image_post') {
        return 'public/images/post';
    } else if (req.headers.target_type === 'image_person') {
        return 'public/images/person';
    } else if (req.headers.target_type === 'video') {
        return 'public/videos';
    } else {
        return 'public/test';
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // const dest = getDestinationOfFile(req);
        cb(null, 'public/test');
    },
    filename: (req, file, cb) => {
        const title = getTitleOfFile(file) + '-';

        const type = getTypeOfFile(file);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, title + uniqueSuffix + '.' + type);
    },
});

const uploadFile = multer({ storage });

module.exports = { uploadFile, getTypeOfFile, getDestinationOfFile };
