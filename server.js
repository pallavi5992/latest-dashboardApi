const express=require("express");
const helmet = require("helmet")
const cors=require("cors");
const routes=require("./routes")
const db=require("./models")
const app=express();

require("dotenv").config();

app.use(cors());
app.use(express.json());   
app.use(express.urlencoded({extended:true}));

app.use("/ddpdadhboard/img",express.static("uploads"));
global.__basedir=__dirname;


db.sequelize.sync().then(()=>{
    console.log("DB connected successfully")
}).catch((err)=>{  
    console.log(err.message);   
});
app.use(helmet())
app.disable('x-powered-by')   
app.use("/",routes)
const ip = "10.10.7.28"  

app.listen(process.env.PORT,ip,()=>{
    console.log(`Server running on port: ${process.env.PORT} and ${ip}`)
});
