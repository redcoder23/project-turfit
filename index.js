const express=require('express');  
const mongoose=require('mongoose');  
const dotenv=require('dotenv'); 
const app=express(); 
 
//these are the import route files 
const sportRoutes=require("./routes/sportRoutes"); 
const groupRoutes=require("./routes/groupRoutes"); 
const academyRoutes=require("./routes/academyRoutes");
const historyRoutes=require("./routes/historyRoutes");
// const bookingRoutes=require("./routes/bookingRoutes");  
const turfRoutes=require("./routes/turfRoutes");
const userRoutes=require("./routes/userRoutes");

//middleware to parse JSON bodies
app.use(express.json());  
 
// load the .env variables
dotenv.config() ;  


mongoose.connect(process.env.MONGO_URI,{})
    .then(()=> console.log('connected to Mongodb'))
    .catch((err)=>console.error("mongodb connection failed",err));   

app.use('/api/turfs',turfRoutes); 
app.use('/api/groups',groupRoutes); 
app.use('/api/academies',academyRoutes); 
app.use('/api/sports',sportRoutes); 
app.use('/api/users',userRoutes);
app.use('/api/history',historyRoutes); 

const PORT=process.env.PORT || 3000 ;  
app.listen(PORT,()=>{ 
    console.log(`server is running on port ${PORT}`); 
})