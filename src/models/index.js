require("dotenv").config();
const {Sequelize,DataTypes}=require("sequelize");
const {sequelize}=require("../config/db.config")


const db={};
db.Sequelize=Sequelize; 
db.sequelize=sequelize;

db.user=require("./user.model")(sequelize,Sequelize,DataTypes);
db.role=require("./role.model")(sequelize,Sequelize,DataTypes);
db.access=require("./accessassignment.model")(sequelize,Sequelize,DataTypes);
db.module=require("./module.model")(sequelize,Sequelize,DataTypes);
db.organisation=require("./organisation.model")(sequelize,Sequelize,DataTypes);
db.moduleConfig=require("./moduleConfig.model")(sequelize,Sequelize,DataTypes);
db.discMaster=require("./discMaster.model")(sequelize,Sequelize,DataTypes);
db.location=require("./location.model")(sequelize,Sequelize,DataTypes)
db.defenceChallange=require("./defenceChallange.model")(sequelize,Sequelize,DataTypes)
db.defenceExportApi=require("./defenceExportApi.model")(sequelize,Sequelize,DataTypes);
db.defenceoffsetOffine=require("./defenceOffsetOffline_model/defenceOffsetOffline.model")(sequelize,Sequelize,DataTypes);
db.defenceoffsetOnline=require("./defenceOffsetOffline_model/defenceOffsetOnline.model")(sequelize,Sequelize,DataTypes);
db.defenceoffsetYearlydata = require("./defenceOffsetOffline_model/defenceOffsetYearly.model")(sequelize,Sequelize,DataTypes)
db.defenceProduction = require("./defenceProduction.model")(sequelize,Sequelize,DataTypes)
db.mrgsIprtarget=require("./mrgs/mrgsIprTarget.model")(sequelize,Sequelize,DataTypes)
db.mrgsconsolidatedData = require("./mrgs/mrgsConsolidatedData.model")(sequelize,Sequelize,DataTypes)
db.makeProject = require("./makeProjects/makeProject.model")(sequelize,Sequelize,DataTypes)
db.makeProject1 = require("./makeProjects/makeProject1.model")(sequelize,Sequelize,DataTypes)
db.makeProject2DAP=require("./makeProjects/makeProject2Dap.model")(sequelize,Sequelize,DataTypes);
db.makeProject2DPSU=require("./makeProjects/makeProject2Dpsu.model")(sequelize,Sequelize,DataTypes);
db.makeProject3=require("./makeProject3/makeProject3.model")(sequelize,Sequelize,DataTypes);
db.makeProject3DAP = require("./makeProject3/makeProject3Dap.model.js")(sequelize,Sequelize,DataTypes);
db.makeProject3DPSU = require("./makeProject3/makeProject3Dpsu.model")(sequelize,Sequelize,DataTypes);
db.idexstartupdefence= require("./idex.model")(sequelize,Sequelize,DataTypes);
db.updefenceCorridor= require("./upDefenceCorridor.model")(sequelize,Sequelize,DataTypes);
db.tndefenceCorridor= require("./tnDefenceCorridor.model")(sequelize,Sequelize,DataTypes);
db.InvestmentDefecneCorridor= require("./InvestmentDefecneCorridor.model")(sequelize,Sequelize,DataTypes);
db.aidefenceCorridor=require("./aiDefenceCorridor.model.js")(sequelize,Sequelize,DataTypes);

module.exports=db