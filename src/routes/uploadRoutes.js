import dotenv from 'dotenv';
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

dotenv.config()

const cloudinaryV2 = cloudinary.v2;

cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
      api_key: process.env.CLOUDINARY_KEY, 
      api_secret: process.env.CLOUDINARY_SECRET,
      secure: true
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: async (req, file) => {
//       // async code using `req` and `file`
//       // ...
//       return {
//         folder: 'folder_name',
//         // format: 'jpeg',
//         public_id: 1,
//       };
//     },
    
//   });

 const upload = multer({ storage: storage });


 export default upload;

