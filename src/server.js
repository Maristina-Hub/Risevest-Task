import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import router from "./routes/router.js";
import uploadRouter from "./routes/uploadRoutes.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(router);
app.use(uploadRouter)

app.get("/", (req, res) => {
    res.json("Welcome to Rise Vest App.");
  });

const __dirname = path.resolve(); 
app.use("/upload", express.static(path.join(__dirname, "/upload")));
app.use("/download", express.static("/download"));
// app.use('/file',express.static('./files'))

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
  



export default app;