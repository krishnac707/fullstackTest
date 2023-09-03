import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import { Register, login } from "./controllers/User.controller.js";
import { HelperToken } from "./helpers/TokenGen.js";
import { CheckSeller } from "./middleware/CheckSeller.middleware.js";
import { Addproduct } from "./controllers/Product.controller.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(morgan("dev"))

app.get("/",(req,res)=>{
    app.send("working!!!")
})

app.post("/register",Register)
// app.post("/login",HelperToken,login)
app.post("/login",login)

app.post("/add-product",Addproduct)


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to db....");
})

app.listen(8000,()=>{
    console.log("server running on port 8000");
})




