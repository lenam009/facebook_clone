const fs = require('fs');
const path = require('path');

// deleteFile('/public/videos/1703559188065-104505885.mp4');

const deleteFile = (pathFile, next) => {
    // pathFile=`/public/images/post/images.jpg`
    const pathFull = path.join(__dirname, '../..', pathFile);

    // console.log('path...........', pathFull);

    fs.access(pathFull, fs.constants.F_OK, (err) => {
        if (!err) {
            fs.unlink(pathFull, (err) => {
                if (err) {
                    return next({
                        statusCode: 500,
                        message: 'Delete image failed',
                        error: 'Delete image failed',
                    });
                }

                console.log('success');
            });
        }
    });
};

const deleteFileApi = (req, res, next) => {
    const fileName = req.body.filename;

    deleteFile();
};

module.exports = { deleteFileApi, deleteFile };
