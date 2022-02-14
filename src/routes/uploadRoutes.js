import express from "express";
import multer from "multer";
import { Upload } from "../model/uploadModel.js"


const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "video/mpeg" ||
    file.mimetype === "video/x-mpeg" ||
    file.mimetype === "audio/mpeg" ||
    file.mimetype === "audio/mp4a-latm"

  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 200000000 }});

uploadRouter.post("/upload", upload.single("imageUrl"), (req, res) => {
  console.log(req.file);
  res.send(`/${req.file.path}`);
});


uploadRouter.get('/download', (req,res,next) => {
  const x =  Upload.find()
  // res.send(x)
  console.log(x)
  res.download(x[0].file.path)
})

export default uploadRouter;