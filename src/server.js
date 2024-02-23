const express=require("express");
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

app.use("/",routes)

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port: ${process.env.PORT}`)
});
