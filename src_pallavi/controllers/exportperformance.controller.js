const db = require("../models");
const sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const helper = require("../helper/helper");
const jwt = require("jsonwebtoken");
const Organisation = db.organisation;
const Export = db.exportperformance;
const Year = db.tblYear;
// const pagination = require("../helper/pagination");
// db.exportperformance.belongsTo(db.tblYear, {
//   foreignKey: "YearID",          
//   as: "Year",
// });

// db.exportperformance.belongsTo(db.organisation, {
//   foreignKey: "OrganisationID",
//   as: "Organisation",
// });

const exportperformanceData = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decodeToken = jwt.decode(token);
    const userId = decodeToken.id;
    const {
      OrganisationID,
      FyYearID,
      ExportValue,
      ExportOrBook,
      Month,
      Remarks,
    } = req.body;
    await Export.create({
      OrganisationID: OrganisationID,
      YearID: FyYearID,
      ExportValue: ExportValue,
      ExportOrBook: ExportOrBook,
      SelectedMonth: Month,
      Remarks: Remarks,
      Deleted: "1",
      ModifiedBy: userId,
    });
    return res.status(200).send({
      status: true,
      message: "Add Export Performance Successfully",
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getAllExportperformanceData = async (req, res) => {
  try {
    const  exportData =[]
    const getAllData = await Export.findAll({
      where: {
        Deleted: "1",
      },
      order: [
        ["ExportPrID", "DESC"], // Sorts by COLUMN in ascending order
      ],
      // include: [
      //   {
      //     model: Year,
      //     required: true,
      //     attributes: ["YearID", "Year"],
      //     as: "Year",
      //   },
      //   {
      //     model: Organisation,
      //     required: true,
      //     attributes: ["OrganisationID", "Name"],
      //     as: "Organisation",
      //   },
      // ],
      attributes: [
        "ExportPrID",
        "OrganisationID",
        "YearID",
        "ExportValue",
        "ExportOrBook",
        "SelectedMonth",
        ["SelectedMonth", "formattedSelectedMonth"],
        "Remarks",
        "Deleted",
      ]
    });
    for (let i = 0; i < getAllData.length; i++) {
      if (getAllData[i].ExportPrID != req.ExportPrID) {
        exportData.push({
          ExportPrID: getAllData[i].ExportPrID,
          OrganisationID: getAllData[i].OrganisationID,
          ExportValue: getAllData[i].ExportValue,
          ExportOrBook: getAllData[i].ExportOrBook,
          SelectedMonth: getAllData[i].SelectedMonth,
          formattedMonth: getAllData[i].formattedSelectedMonth,
          Remarks: getAllData[i].Remarks || "",
          Deleted: getAllData[i].Deleted,
          FYear:   getAllData[i].YearID
            ? await helper.getFYear(getAllData[i].YearID)
            : "",
          OrganisationName: getAllData[i].OrganisationID
            ? await helper.organName(getAllData[i].OrganisationID)
            : "",
        });
      }
    }
    const page = parseInt(req.query.page) || 0;
    const limit = req.query.limit || 10;
    const startIndex = page * limit;
    const endIndex = (page + 1) * limit;
    const result = {};
    result.dataItems = exportData.slice(startIndex, endIndex);
    result.totalItems = exportData.length;
    result.totalPage = Math.ceil(exportData.length / limit);  
    result.currentPage = page;
    if (result.dataItems.length == 0) {
      return res.status(200).json({
        status: true,
        message: "No data found", 
        data: result,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "List of export performance data",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
module.exports = {
  exportperformanceData,
  getAllExportperformanceData,
};
