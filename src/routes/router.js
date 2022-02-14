import express from 'express';
import dotenv from 'dotenv';
import { userController } from '../controller/userController.js';



dotenv.config();

const router = express.Router();


router.post("/register", userController.signUp);
router.post("/login", userController.login);



export default router;