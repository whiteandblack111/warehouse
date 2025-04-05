require('dotenv').config();
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');
const Help_Service = require('./Help_Service');


const createPath = () => {
    // const today = new Date();
    // const year = today.getFullYear().toString();
    // const month = (today.getMonth() + 1).toString().padStart(2, '0');
    // const day = today.getDate().toString().padStart(2, '0');
    const api_url = process.env.API_URL

    const filePath = path.join(
        __dirname,
        '..',
        'static',
        
    );
   


    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
    }


    return filePath;
};

const uploadFile = (filePath, file, tratslit_name) => {
    
    // console.log("file=======>", file);

    let fileName = tratslit_name

    console.log("fileName=======>", fileName);

    file.mv(path.resolve(filePath, fileName));

    return fileName
}


module.exports = {
    createPath,
    uploadFile
}