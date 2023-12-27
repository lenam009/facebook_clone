const express = require('express');
const router = express.Router();
const upload = require('../app/middlewares/upload.file');

const controller = {
    uploadFile: (req, res, next) => {
        // console.log('req.file', req.file);
        // console.log('req.body', req.body);
        return res.status(201).json({
            statusCode: 201,
            message: 'Upload file successfully',
            data: {
                filename: req.file.filename,
            },
        });
    },
};

router.post('/', upload.uploadFile.single('file'), controller.uploadFile);

module.exports = router;
