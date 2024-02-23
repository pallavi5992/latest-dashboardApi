const db = require("../models");
const MrgsIprTarget = db.mrgsIprtarget;
const MrgsConsolidatedData=db.mrgsconsolidatedData
const { finalyear } = require("../helper/finalYear");

const addmrgsIprTarget = async (req, res) => {
  try {
    const { YearID, Organization, IPRTarget } = req.body;
    const userId = req.userId;
    await MrgsIprTarget.create({
      YearID: YearID,
      Organization: Organization,
      IPRTarget: IPRTarget,
      ModifiedOn: new Date(),
      ModifiedBy: userId,
    });
    return res
      .status(200)
      .send({ status: true, message: "Added MRGS IPR Targte Successfully " });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getAllMrgsIprTarget = async (req, res) => {
  try {
    const ApiMrgsIprTarget = [];

    const mrgsIprTaegte = await MrgsIprTarget.findAll({});
    for (let i = 0; i < mrgsIprTaegte.length; i++) {
      ApiMrgsIprTarget.push({
        id: mrgsIprTaegte[i].ID,
        YearID: mrgsIprTaegte[i].YearID
          ? finalyear(mrgsIprTaegte[i].YearID)
          : "",
        Organization: mrgsIprTaegte[i].Organization,
        IPRTarget: mrgsIprTaegte[i].IPRTarget,
      });
    }

    return res.status(200).send({
      status: true,
      message: "data found ",
      data: ApiMrgsIprTarget,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getByIdMrgsIprTarget = async (req, res) => {
  try {
    const { ID } = req.params;
    const foundMrgsIprtargte = await MrgsIprTarget.findByPk(ID, {
      attributes: ["YearID", "Organization", "IPRTarget"],
    });

    if (!foundMrgsIprtargte) {
      return res.status(404).send({ status: false, message: "Data not found" });
    }

    return res.status(200).send({
      status: true,
      message: " Data found Successfully",
      data: foundMrgsIprtargte,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const updateMrgesIprTargte = async (req, res) => {
  try {
    const { ID } = req.params;
    const { YearID, Organization, IPRTarget } = req.body;

    const foundmrgsiprdata = await MrgsIprTarget.findByPk(ID, {});

    if (!foundmrgsiprdata) {
      return res.status(404).send({
        status: false,
        message: "Data not found",
      });
    }
    await MrgsIprTarget.update(
      {
        YearID,
        Organization,
        IPRTarget,
      },
      { where: { ID } }
    );
    return res
      .status(200)
      .send({ status: true, message: "MRGS Data updated successfully" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const addmrgsConsolidatedData = async (req, res) => {
  try {
    const {
      YearID,
      Organization,
      IPRTarget,
      IPRFiled,
      IPRGranted,
      ModifiedOn,
    } = req.body;
    const userId = req.userId;

    await MrgsConsolidatedData.create({
      YearID: YearID,
      Organization: Organization,
      IPRTarget: IPRTarget,
      IPRFiled: IPRFiled,
      IPRGranted: IPRGranted,
      ModifiedOn: ModifiedOn,
      ModifiedBy: userId,
    });
    return res
      .status(200)
      .send({
        status: true,
        message: "Added MRGS Consolidated Data Successfully",
      });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getByIdConsolidatedData = async (req, res) => {
  try {
    const { ID } = req.params;
    const foundConsolidatedData = await MrgsConsolidatedData.findByPk(ID, {
      attributes: [
        "YearID",
        "Organization",
        "IPRTarget",
        "IPRFiled",
        "IPRGranted",
        "ModifiedOn",
      ],
    });

    if (!foundConsolidatedData) {
      return res.status(404).send({ status: false, message: "Data not found" });
    }

    return res.status(200).send({
      status: true,
      message: " Data found Successfully",
      data: foundConsolidatedData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
const updateConsolidatedData = async (req, res) => {
  try {
    const { ID } = req.params;
    const {
      YearID,
      Organization,
      IPRTarget,
      IPRFiled,
      IPRGranted,
      ModifiedOn,
    } = req.body;

    const foundMrgsConsolidatedData = await MrgsConsolidatedData.findByPk(
      ID,
      {}
    );

    if (!foundMrgsConsolidatedData) {
      return res.status(404).send({
        status: false,
        message: "Data not found",
      });
    }
    await MrgsIprTarget.update(
      {
        YearID,
        Organization,
        IPRTarget,
        IPRFiled,
        IPRGranted,
        ModifiedOn,
      },
      { where: { ID } }
    );
    return res
      .status(200)
      .send({
        status: true,
        message: "MRGS ConsolidatedData  Data updated successfully",
      });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getByyearIDConsolidatedData = async (req, res) => {
  try {
    const { YearID } = req.params;
    const foundConsolidatedData = await MrgsConsolidatedData.findAll({where:{YearID},
      attributes: ["ID", "Organization", "IPRTarget","IPRFiled","IPRGranted","ModifiedOn"],

    });
 
    if (!foundConsolidatedData) {
      return res.status(200).send({ status: false, message: "Data not found",data:[] });
    }

    return res.status(200).send({
      status: true,
      message: "Found Data Successfully",
      data: foundConsolidatedData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  addmrgsIprTarget,
  getAllMrgsIprTarget,
  getByIdMrgsIprTarget,
  updateMrgesIprTargte,

  addmrgsConsolidatedData,
  getByIdConsolidatedData,
  updateConsolidatedData,
  getByyearIDConsolidatedData
};
