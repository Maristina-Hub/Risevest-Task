import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User } from "../model/userModel.js";

dotenv.config();



export const userController = {
    signUp: async (req, res) => {
        const { email, password, fullname } = req.body;
    
        try {
          if ( !email || !password || !fullname ) {
            return res
              .status(400)
              .json({ status: 'fail', message: 'Please fill all fields' });
          }
          
    
          // find if email already exists
          const isUserExist = await User.findOne({ email });
    
          if(isUserExist) {
            return res
              .status(400)
              .json({ status: 'fail', message: 'User already exists' });
          }
          
    
          // password hash
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(password, salt);
    
          if(hash) {
            const newUser = new User({ email, password: hash, fullname });
            const savedUser = await newUser.save();
            
    
            if(savedUser) {
              jwt.sign(
                { id: savedUser._id },
                process.env.JWT_SECRET,
                { expiresIn: +process.env.JWT_EXPIRY },
                (err, token) => {
                  if (err) {
                    throw err;
                  }
                  res.status(200).json({ 
                    status: 'success',
                    data: {
                      token: "Bearer " + token,
                      id: savedUser._id,
                    },
                    message: 'successful'
                  });
                  
                }
              );
            }
            
          }
        } catch (error) {
          return res.status(500).json({
            status: "Failed",
            error
          })
        }
      }, 
      
      
      login: async (req, res) => {
        // Checking if all fields are filled
        if(![req.body.email, req.body.password].every(Boolean)) {
          return res.status(400).json({ 
            status: "Failed", 
            message: "Enter your email and password!"
          });
        }
    
        const { email, password } = req.body;
    
        try {
          // Search database for user matching email address given
          const existingUser = await User.findOne({ email });
    
          if(!existingUser || !Object.keys(existingUser).length) {
            return res.status(404).json({ status: "Failed", message: "Record not found" });
          }
          
          // Check if password matches password stored in the db
          const isMatch = await bcrypt.compare(password, existingUser.password);
    
          // Prevents saved password from being visible to user
          delete res.isMatch;
    
          if(!isMatch) {
            return res.status(404).json({ status: "Failed", message: "Email or password incorrect"});
          }
         
          // Payload to be sent in token
          const { fullname } = existingUser;
    
          const payload = {
            user: {
              fullname
            }
          }
         
          // Generate token
          const token = jwt.sign(payload, process.env.JWT_SECRET, { 
            expiresIn: +process.env.JWT_EXPIRY
          });
    
          // If token is not generated
          if(!token) return res.status(401).json({
            status: "Failed", 
            message: "Error logging in. Could not generate token."
          });
          
    
          return res.status(200).json({
            status: 'Success',
            message: "Logged in successfully",       
            data: {
              email: existingUser.email,
              fullname,
              token: `Bearer ${token}`
            }
            
          })

         
    
        } catch (error) {
          return res.status(500).json({ status: "Failed", message: error.message });
        }
      }
        
}