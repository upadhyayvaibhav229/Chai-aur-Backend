import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';
import fs from "fs";

// FileUpload code

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })



        // file uploaded successfully 
        console.log('file is uploaded on cloudinary');
        response.url();
        console.log(response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally saved temploraily file as the upload operation got failed.
        return null
    }
}

// Upload an image
const uploadResult = await cloudinary.uploader
    .upload(
        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
        public_id: 'shoes',
    }
    )
    .catch((error) => {
        console.log(error);
    });

    
export {uploadOnCloudinary}

