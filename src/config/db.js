
import dbConnection from '../database/db.js';
import dotenv from 'dotenv';

dotenv.config();
dbConnection.getConnect();

const urlName = process.env.MONGODB_URI;
const databaseName = process.env.DATABASE_USER 

const dbConfig = {
    url: urlName,
    database: databaseName,
    imgBucket: "photos",
  };

  export default dbConfig;