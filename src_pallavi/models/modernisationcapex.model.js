module.exports = (sequelize, Sequelize, DataTypes) => {
    const modernisationcapex = sequelize.define("ddpdashboard_modernisationcapex", {
        ModernCapexID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      OrganisationID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ValueInCr: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      StartDate: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      EndDate: {     
        type: DataTypes.STRING,
        allowNull: false,
    },
    Financial: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Pysical: {
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
    return modernisationcapex;
  };
  