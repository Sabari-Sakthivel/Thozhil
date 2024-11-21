const express=require("express");
const dotenv=require("dotenv");
const cors=require('cors');
const connectDB=require('./config/Database')

dotenv.config();


const app=express();

app.use(cors());
connectDB();

app.use(express.json());


const PORT=process.env.PORT
app.listen((PORT,()=>console.log(`Server is running in : ${PORT}`)
));


    