const express = require('express');
const router = express.Router();
const upload = require('../app/middlewares/upload.file');
const moveFile = require('../app/middlewares/move.file');

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

    moveFile: (req, res, next) => {
        // console.log('req.file', req.file);
        console.log('req.body', req.body);

        moveFile(req, next);

        return res.status(201).json({
            statusCode: 201,
            message: 'Move file successfully',
        });
    },
};

router.post('/', upload.uploadFile.single('file'), controller.uploadFile);

router.post('/moveFile', controller.moveFile);

router.use((err, req, res, next) => {
    const statusCode = err.statusCode ?? 500;
    res.status(statusCode).json({ service: 'Upload_Api', ...err });
});

module.exports = router;
