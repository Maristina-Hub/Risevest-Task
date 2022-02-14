import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/router.js";
import upload from "./routes/uploadRoutes.js"

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.get("/", (req, res) => {
    res.json("Welcome to Rise Vest App.");
  });

  app.post("/upload", upload.single("thumbnail"), async (req, res) => {
       return await res.json({ message: "succes", thumbnail: req.file.path });
  });



export default app;