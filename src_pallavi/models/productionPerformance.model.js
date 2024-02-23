module.exports = (sequelize, Sequelize, DataTypes) => {
  const prProduction = sequelize.define("ddpdashboard_productionPerformance", {
    ProductionID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    YearID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    OrganisationID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },   
    Cumulative: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Quarter: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Remarks: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Deleted: { 
      type: Sequelize.ENUM("0", "1"),
      comment: "0-deleted,1-notDeleted",
      allowNull: true,
    },
    ModifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  return prProduction;
};
