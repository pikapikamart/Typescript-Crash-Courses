import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import postRoutes from "./routes/posts.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb" }));
app.use(cors());

app.use("/posts", postRoutes); 

app.get("/", ( req, res ) =>{
  res.send("Hello to memories API");
})

const MONGODB_URL = process.env.MONGO_DB_URI;
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
  app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
})
.catch(error =>{
  console.log(error.message);
});




