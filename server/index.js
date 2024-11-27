const express=require("express");
const dotenv=require("dotenv");
const cors=require('cors');
const connectDB=require('./config/Database')
// const {notFound, errorHandler}=require('./middleware/ErrorMiddleware');
const userRoutes = require('./routes/UserRoutes')


dotenv.config();


const app=express();
app.use(express.json());

app.use(cors());
connectDB();



// Auth Routes .....

app.use ('/api/user',userRoutes);


// Error handling middlewares......

// app.use (notFound);
// app.use(errorHandler);


const PORT=process.env.PORT
app.listen((PORT,()=>console.log(`Server is running in : ${PORT}`)
));


    