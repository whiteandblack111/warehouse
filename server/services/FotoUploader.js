require('dotenv').config();
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');

const createPath = () => {
    // const today = new Date();
    // const year = today.getFullYear().toString();
    // const month = (today.getMonth() + 1).toString().padStart(2, '0');
    // const day = today.getDate().toString().padStart(2, '0');
    const api_url = process.env.API_URL

    const filePath = path.join(
        __dirname,
        '..',
        'files',

    );



    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
    }


    return filePath;
};

const uploadFile = (filePath, file) => {
    const file_extension = file.name.split('.')[1]

    const generate_name = uuid.v4()

    let fileName = `${generate_name}.${file_extension}`;
    file.mv(path.resolve(filePath, fileName));

    return fileName
}

const deleteFile = (fileName) => {

    const filePath = path.join(
        __dirname,
        '..',
        'files',
        
    );

    // console.log("deleteFile-=-=-=>>> ", filePath)

    const path_to_file = path.resolve(filePath, fileName)
    // fs.rm(filePath)

    fs.unlink(path_to_file, (err) => {
        if (err) throw err;
        console.log('Файл удален');
    });
}


module.exports = {
    createPath,
    uploadFile,
    deleteFile
}