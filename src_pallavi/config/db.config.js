require("dotenv").config();
const {Sequelize,DataTypes}=require("sequelize");

exports.sequelize=new Sequelize(process.env.DB,process.env.USER,process.env.PASSWORD,{
    host:process.env.HOST,
    dialect:process.env.DIALECT,
    operatorsAliases:0,
    

    pool:{
        max:5,
        min:0,
        acquire:process.env.ACQUIRE,
        idle:process.env.IDLE
    },
    timezone:'+05:30'
});