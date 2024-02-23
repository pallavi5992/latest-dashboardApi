const db = require("../models");
const DefenceProduction = db.defenceProduction;
const { finalyear } = require("../helper/finalYear");
const moment = require("moment");
const { idIntoBase64, Base64toId } = require("../helper/idIntoBase64");

const adddefenceProduction = async (req, res) => {
  try {
    const {
      YearID,
      Quarter,
      DPSU,
      OFB,
      Other_PSU,
      Defence_Private_Companies,
      ModifiedOn,
    } = req.body;
    const userId = req.userId;   
    await DefenceProduction.create({
      YearID: YearID,
      Quarter: Quarter,
      DPSU: DPSU,
      OFB: OFB,
      Other_PSU: Other_PSU,
      Defence_Private_Companies,
      ModifiedOn: ModifiedOn,
      ModifiedBy: userId,
    });
    return res
      .status(200)
      .send({ status: true, message: " added Defence Production sccessfully" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getAllDefenceProductionData = async (req, res) => {
  try {
    const productionData = [];
    const key = req.query.key;
    const production = await DefenceProduction.findAll({
      attributes: [
        "DefenceProductionID",
        "YearID",
        "Quarter",
        "DPSU",
        "Defence_Private_Companies",
        "Other_PSU",
        "OFB",
        "Deleted",
      ],
    });

    for (let i = 0; i < production.length; i++) {
      const encoded =await idIntoBase64(production[i].DefenceProductionID)
      productionData.push({
        productionId: encoded,
        YearID: finalyear(production[i].YearID),
        Quarter: production[i].Quarter || "",
        DPSU: production[i].DPSU,
        Defence_Private_Companies: production[i].Defence_Private_Companies,
        Other_PSU: production[i].Other_PSU,
        new7Company: production[i].OFB,
        status: production[i].Deleted,
      });
    }

    if (key) {
      const prodData = productionData.filter((item) => {
        return (
          item.YearID.includes(key) ||
          String(item.Quarter).includes(key) ||
          String(item.incomplete_claims_clarification_sought).includes(key) ||
          String(item.DPSU).includes(key) ||
          String(item.Defence_Private_Companies).includes(key) ||
          String(item.Other_PSU).includes(key) ||
          String(item.new7Company).includes(key)
        );
      });
      const result = {};
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = page * limit;
      const endIndex = (page + 1) * limit;
      result.dataItems = prodData.slice(startIndex, endIndex);
      result.totalItems = prodData.length;
      result.totalPage = Math.ceil(prodData.length / limit);
      result.currentPage = page;

      return res
        .status(200)
        .send({ status: true, message: "Data found", data: result });
    } else {
      const result = {};
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = page * limit;
      const endIndex = (page + 1) * limit;
      result.dataItems = productionData.slice(startIndex, endIndex);
      result.totalItems = productionData.length;
      result.totalPage = Math.ceil(productionData.length / limit);
      result.currentPage = page;
      return res
        .status(200)
        .send({ status: true, message: "Data found", data: result });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const updatedefenceProduction = async (req, res) => {
  try {
    const { DefenceProductionID } = req.params;
    const actualId=await Base64toId(DefenceProductionID)
    const {
      YearID,
      Quarter,
      DPSU,
      OFB,
      Other_PSU,
      Defence_Private_Companies,
      ModifiedOn,
    } = req.body;

    const founddefenceProduction = await DefenceProduction.findByPk(
      actualId
    );

    if (!founddefenceProduction) {
      return res.status(404).send({
        status: "error",
        message: `Defence production exist`,
      });
    }

    await DefenceProduction.update(
      {
        YearID,
        Quarter,
        DPSU,
        OFB,
        Other_PSU,
        Defence_Private_Companies,
        ModifiedOn,
      },
      { where: { actualId } }
    );

    return res.status(200).send({
      status: true,
      message: `Derfence Production updated successfully`,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getByIddefenceProduction = async (req, res) => {
  try {
    const { DefenceProductionID } = req.params;
    const actualId=await Base64toId(DefenceProductionID)
    const foundDefenceProduction = await DefenceProduction.findByPk(
      actualId,
      {
        attributes: [
          "YearID",
          "Quarter",
          "DPSU",
          "OFB",
          "Other_PSU",
          "Defence_Private_Companies",
          "ModifiedOn",
        ],
      }
    );

    if (!foundDefenceProduction) {
      return res.status(404).send({
        status: false,
        message: `Data not found`,
      });
    }
    const productionData = {
      YearID: foundDefenceProduction.YearID,
      Quarter: foundDefenceProduction.Quarter || "",
      DPSU: foundDefenceProduction.DPSU,
      OFB: foundDefenceProduction.OFB,
      Other_PSU: foundDefenceProduction.Other_PSU,
      Defence_Private_Companies:
        foundDefenceProduction.Defence_Private_Companies,
      ModifiedOn: moment(
        foundDefenceProduction.ModifiedOn,
        "YYYY-MM-DD"
      ).format("MM/DD/YYYY"),
    };
    return res.status(200).send({
      status: true,
      message: "Data found successfully",
      data: productionData,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const deletedefenceProduction = async (req, res) => {
  try {
    const { DefenceProductionID } = req.params;
    const actualId=await Base64toId(DefenceProductionID)
    
    const status = req.query.status;
    if (!status) {
      return res
        .status(400)
        .send({ status: true, message: "Please enter status" });
    }

    if (status == "1") {
      await DefenceProduction.update(
        {
          Deleted: status,
        },
        {
          where: {
            DefenceProductionID: actualId,
          },
        }
      );

      return res
        .status(200)
        .send({
          status: true,
          message: "DefenceProduction inActive successfully",
        });
    } else {
      await DefenceProduction.update(
        {
          Deleted: status,
        },
        {
          where: {
            DefenceProductionID: actualId,
          },
        }
      );

      return res
        .status(200)
        .send({
          status: true,
          message: "DefenceProduction active successfully",
        });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  getAllDefenceProductionData,
  adddefenceProduction,
  updatedefenceProduction,
  getByIddefenceProduction,
  deletedefenceProduction,
};
