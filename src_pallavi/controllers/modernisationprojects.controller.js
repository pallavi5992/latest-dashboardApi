const db = require("../models");
const sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const helper = require("../helper/helper");
const jwt = require("jsonwebtoken");
const MordenP = db.modernisationprojects;
const Organisation = db.organisation;

const modernisationprojectsData = async (req, res) => {   
  try {
    const {
      OrganisationID,
      Achievement,
      Remarks,
    } = req.body;
    const token = req.headers["x-access-token"];
    const decodeToken = jwt.decode(token);
    const userId = decodeToken.id;

    await MordenP.create({
      OrganisationID: OrganisationID,
      MajorAchievement: Achievement,
      Remarks: Remarks,
      Deleted: "1",
      ModifiedBy: userId,
    });

    return res.status(200).send({
      status: true,
      message: "modernisation Project Added Successfully",
    });
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};
const getAllmodernisationprojectsData = async (req, res) => {
  try {
    const mordenData =[]
    const getAllData = await MordenP.findAll({
      where: {
        Deleted: "1",
      },
      order: [
        ["ModernProjectID", "DESC"], // Sorts by COLUMN in ascending order
      ],
      attributes: [
        "ModernProjectID",
        "OrganisationID",
        "MajorAchievement",
        "Remarks",
        "Deleted",
      ]
    });
    for (let i = 0; i < getAllData.length; i++) {
      if (getAllData[i].ModernProjectID != req.ModernProjectID) {
        mordenData.push({
          ModernProjectID: getAllData[i].ModernProjectID,
          OrganisationID: getAllData[i].OrganisationID,
          MajorAchievement: getAllData[i].MajorAchievement,
          Remarks: getAllData[i].Remarks || "",
          Deleted: getAllData[i].Deleted,
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
    result.dataItems = mordenData.slice(startIndex, endIndex);
    result.totalItems = mordenData.length;
    result.totalPage = Math.ceil(mordenData.length / limit);  
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
        message: "List Of Mordenisation Project",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};


module.exports = {
    modernisationprojectsData,
    getAllmodernisationprojectsData
};
