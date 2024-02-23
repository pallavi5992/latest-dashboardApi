module.exports = (sequelize, Sequelize, DataTypes) => {
  const DefenceExportApi = sequelize.define("tbldefenceexport_2", {
    DefenceExportID: {
      type: Sequelize.INTEGER,
      primaryKey:true,
      autoIncrement: true,
      },
    fin_year: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    dpsu: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cmy_cat: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    privatecompanies: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    rdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sec_str: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    qtr: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    private_company_offline: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ModifiedOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ModifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    IPAddress: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ContractValue:{
      type: DataTypes.INTEGER,
      allowNull: true,
    }

  });
  return DefenceExportApi;
};
