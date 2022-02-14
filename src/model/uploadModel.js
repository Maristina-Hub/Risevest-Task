import mongoose from 'mongoose';

const { Schema, model } = mongoose;


const uploadSchema = new Schema({
  thumbnail: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
//   limits: {
//     fileSize: 200000000
//   },
//   abortOnLimit: true,
  is_safe: {
    type: Boolean,
    default: true
  },
  cloudurl: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
  
},
  { timestamps: true }
);

export const Upload = model('upload', uploadSchema);