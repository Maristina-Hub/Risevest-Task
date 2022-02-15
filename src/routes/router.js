import express from 'express';
import dotenv from 'dotenv';
import { userController } from '../controller/userController.js';
// import homeController from "../controller/homeController.js";
import {uploadController} from "../controller/upload.js";



dotenv.config();

const router = express.Router();


router.post("/register", userController.signUp);
router.post("/login", userController.login);
// router.get("/", homeController.getHome);
router.post("/upload", uploadController.uploadFiles);
router.get("/files", uploadController.getListFiles);
router.get("/files/:name", uploadController.download);



export default router;