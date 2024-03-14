const mongoose=require( 'mongoose' )
const path = require('path')
const express=require("express")
const userRoute=require('./routes/user')
require("./db/conn")


 const app=express();
 const port = process.env.PORT || 7000;
//  mongoose.connect('mongodb://localhost:/127.0.0.1:27017/blogify').then((e)=>console.log("MongoDB Connected"))
app.get('/',(req,res)=>{
    res.render('home.ejs');
 })

 app.set('view engine', 'ejs')
 app.set('views', path.resolve("./views"))
 app.use(express.urlencoded({extended:false}))


 app.use("/user",userRoute)

 
 app.listen(port, () => {
     console.log(`connection success At port ${port}`);
 });
// const port = process.env.PORT || 3000;
