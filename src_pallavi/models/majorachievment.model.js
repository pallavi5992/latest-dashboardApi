module.exports = (sequelize, Sequelize, DataTypes) => {  
    const majorachievments = sequelize.define("ddpdashboard_majorachievments", {
        MajorID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      OrganisationID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      MajorAchievement: {  
        type: Sequelize.ENUM("0", "1"),
        comment: "1-Yes,2-No",
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
    return majorachievments;
  };
  