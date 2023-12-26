const fs = require('fs');
const path = require('path');

// copyFile(
//     '/public/test/1703559831887-866062406.mp4',
//     '/public/videos/1703559831887-866062406.mp4',
//     next,
// );

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

const moveFile = async (fileName, req, next) => {
    const sourcePath = '/public/test/' + fileName;
    const destinationPath = getDestinationOfFile(req) + '/' + fileName;

    // path=`/public/images/post/images.jpg`
    const sourcePathFull = path.join(__dirname, '../..', sourcePath);
    const destinationPathFull = path.join(__dirname, '../..', destinationPath);

    // console.log('sourcePathFull', sourcePathFull);
    // console.log('destinationPathFull', destinationPathFull);

    return await fs.access(sourcePathFull, fs.constants.F_OK, async (err) => {
        if (!err) {
            await fs.rename(sourcePathFull, destinationPathFull, (err) => {
                if (err) {
                    return next({
                        statusCode: 500,
                        message: 'Move file failed',
                        error: 'Move file failed',
                    });
                }
                console.log('Move file successfully');
            });
        }
    });
};

module.exports = moveFile;
