require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize, DataTypes);
db.role = require("./role.model")(sequelize, Sequelize, DataTypes);
db.access = require("./accessassignment.model")(sequelize,Sequelize,DataTypes);
db.module = require("./module.model")(sequelize, Sequelize, DataTypes);
db.organisation = require("./organisation.model")(sequelize,Sequelize,DataTypes);
db.moduleConfig = require("./moduleConfig.model")(sequelize,Sequelize,DataTypes);
/*****************  new Module **************/
db.tblYear = require("./tblYear.model")(sequelize, Sequelize, DataTypes);
db.prProduction = require("./productionPerformance.model")(sequelize,Sequelize,DataTypes);
db.orderBook = require("./orderBookPosition.model")(sequelize,Sequelize,DataTypes);
db.profitability = require("./profitability.model")(sequelize,Sequelize,DataTypes);
db.indigenization=require("./indigenization.model")(sequelize,Sequelize,DataTypes);
db.newproject=require("./newproject.model")(sequelize,Sequelize,DataTypes);
db.modernisationcapex=require("./modernisationcapex.model")(sequelize,Sequelize,DataTypes);
db.exportperformance=require("./exportperformance.model")(sequelize,Sequelize,DataTypes);
db.modernisationprojects=require("./modernisationprojects.model")(sequelize,Sequelize,DataTypes);
db.majorachievments =require("./majorachievment.model")(sequelize,Sequelize,DataTypes);
db.idexmakeproject=require("./idexmakeproject.model")(sequelize,Sequelize,DataTypes);

/*****************  new Module **************/
module.exports = db;
