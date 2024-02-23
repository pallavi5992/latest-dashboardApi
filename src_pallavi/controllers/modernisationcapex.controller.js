const db = require("../models");
const sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const helper = require("../helper/helper");
const jwt = require("jsonwebtoken");
const Morden = db.modernisationcapex;
const Organisation = db.organisation;
const tblYear = db.tblYear;
// const pagination = require("../helper/pagination");
// db.organisation.belongsTo(db.modernisationcapex, {
//   foreignKey: "OrganisationID",
//   as: "ComNam",
// });

// db.modernisationcapex.belongsTo(db.organisation, {
//   foreignKey: "OrganisationID",
//   as: "Company",
// });
// db.modernisationcapex.belongsTo(db.tblYear, {
//     foreignKey: "YearID",
//     as: "FYYr",
//   });
const modernisationcapexData = async (req, res) => {
  try {
    const {
      OrganisationID,
      ValueInCr,
      StartDate,
      EndDate,
      Financial,
      Pysical,
      Remarks,
    } = req.body;
    const token = req.headers["x-access-token"];
    const decodeToken = jwt.decode(token);
    const userId = decodeToken.id;

    await Morden.create({
      OrganisationID: OrganisationID,
      ValueInCr:ValueInCr,
      StartDate:StartDate,
      EndDate:EndDate,
      Financial:Financial,
      Pysical:Pysical,
      Remarks: Remarks,
      Deleted: "1",
      ModifiedBy: userId,
    });

    return res.status(200).send({
      status: true,
      message: "modernisation Capex Added Successfully",
    });
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};
const getAllmodernisationcapexData = async (req, res) => {
  try {
    const modernCapexData =[]
    // const { page, size } = req.query;
    // const { limit, offset } = pagination.getPagination(page, size);
    // const getAllData = await Morden.findAll({
    //   where: {
    //     Deleted: "1",
    //   },
    //   order: [
    //     ["ModernCapexID", "DESC"], // Sorts by COLUMN in ascending order
    //   ],
    //   include: [
    //        {
    //       model: tblYear,
    //       required: true,
    //       attributes: ["YearID", "Year"],
    //       as: "FYYr",
    //     },
    //     {
    //       model: Organisation,
    //       required: true,
    //       attributes: ["OrganisationID", "Name","Code"],
    //       as: "Company",
    //     }
      
    //   ],
    //   attributes: [
    //     "ModernCapexID",
    //     "OrganisationID",
    //     "YearID",
    //     "Remarks",
    //     "Deleted",
    //   ],

    //   limit,
    //   offset,
    // });
    // const result = pagination.getPagingData(getAllData, page, limit);
    // if (getAllData.count !== 0) {
    //   return res.status(200).json({
    //     status: true,
    //     message: "List of Modern Capex data",
    //     data: result,
    //   });
    // } else {
    //   return res.status(200).json({
    //     status: true,
    //     message: "No data found",
    //     data: result,
    //   });
    // }

      const getAllData = await Morden.findAll({
      where: {
        Deleted: "1",
      },
      order: [
        ["ModernCapexID", "DESC"], // Sorts by COLUMN in ascending order
      ],
      attributes: [
        "ModernCapexID",
        "OrganisationID",
        "ValueInCr",
        "StartDate",
        "EndDate",
        "Financial",
        "Pysical",
        "Remarks",
        "Deleted",
      ],
    });

    for (let i = 0; i < getAllData.length; i++) {
      if (getAllData[i].ModernCapexID != req.ModernCapexID) {
        modernCapexData.push({
          ModernCapexID: getAllData[i].ModernCapexID,
          OrganisationID: getAllData[i].OrganisationID,
          ValueInCr: getAllData[i].ValueInCr,
          StartDate: getAllData[i].StartDate,
          EndDate: getAllData[i].EndDate,
          Financial: getAllData[i].Financial,
          Pysical: getAllData[i].Pysical,
          Remarks: getAllData[i].Remarks || "",
          Deleted: getAllData[i].Deleted,
          // FYear:   getAllData[i].YearID
          //   ? await helper.getFYear(getAllData[i].YearID)
          //   : "",
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
    result.dataItems = modernCapexData.slice(startIndex, endIndex);
    result.totalItems = modernCapexData.length;
    result.totalPage = Math.ceil(modernCapexData.length / limit);
    result.currentPage = page;
    
    if (result.dataItems.length == 0) {
        return res
          .status(200)
          .send({ status: false, message: "Data not found", data: result });
    }
    
    return res.status(200).json({
      status: true,
      message: "List Of Modern Capex Data",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};


module.exports = {
    modernisationcapexData,
    getAllmodernisationcapexData
};
