require('dotenv').config();
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');

const createPath = (entityDirectoryName) => {
    // const today = new Date();
    // const year = today.getFullYear().toString();
    // const month = (today.getMonth() + 1).toString().padStart(2, '0');
    // const day = today.getDate().toString().padStart(2, '0');

    const filePath = path.join(
        __dirname,
        '..',
        'static',
        'foto',
        entityDirectoryName,
        // year,
        // month,
        // day
    );

    // console.log("filePath: ", filePath)

    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
    }

    return filePath;
};

const uploadFile = (filePath, file) => {
    let fileName = uuid.v4() + '.jpg';
    file.mv(path.resolve(filePath, fileName));

    return fileName
}


module.exports = {
    createPath,
    uploadFile
}