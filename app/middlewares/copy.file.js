const fs = require('fs');
const path = require('path');

// copyFile(
//     '/public/test/1703559831887-866062406.mp4',
//     '/public/videos/1703559831887-866062406.mp4',
//     next,
// );

const copyFile = (sourcePath, destinationPath, next) => {
    // path=`/public/images/post/images.jpg`
    const sourcePathFull = path.join(__dirname, '../..', sourcePath);
    const destinationPathFull = path.join(__dirname, '../..', destinationPath);

    // console.log('sourcePathFull', sourcePathFull);
    // console.log('destinationPathFull', destinationPathFull);

    fs.access(sourcePathFull, fs.constants.F_OK, async (err) => {
        if (!err) {
            await fs.rename(sourcePathFull, destinationPathFull, (err) => {
                if (err) {
                    console.log('error...', err);
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

module.exports = copyFile;
