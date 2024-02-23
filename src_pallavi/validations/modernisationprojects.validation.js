const db = require("../models");
const FyYear = db.tblYear;
const MordenP = db.modernisationprojects;
const Organisation = db.organisation;


const checkIfMordenExists = async (organisationID) => {
  try {
    const existingRecord = await MordenP.findOne({
      where: {
        OrganisationID: organisationID,
      },
    });

    return !!existingRecord; // Return true if the record exists, false otherwise
  } catch (error) {
    console.error("Error checking if record exists:", error);
    return false;
  }
};
const modernisationprojectsData = async (req, res, next) => {
  try {
    const {
      OrganisationID,
      Achievement,
      Remarks,
    } = req.body;
    if (!OrganisationID) {
      return res
        .status(400)
        .send({ status: false, message: "Please select organisation" });
    } else if (!Achievement) {
        return res.status(400).send({
          status: false,
          message: "Please select data Major Achievement!",
        });
      } else if (!Remarks) {
      return res.status(400).send({
        status: false,
        message: "Please Enter Remarks!",
      });
    }
    const OrgExist = await Organisation.findOne({
      where: {
        OrganisationID: OrganisationID,
      },
    });
    if (!OrgExist) {
      return res
        .status(400)
        .send({ status: false, message: "Organisation not exist" });
    }
    const recordExists = await checkIfMordenExists(
      OrganisationID
    );
    if (recordExists) {
      return res
        .status(400)
        .send({ status: false, message: "Record already exists." });
    }
    const achievement = [1,2]
    const checkachievement = achievement.includes(Achievement)  

    if(!checkachievement){
      return res
      .status(400)
      .send({ status: false, message: "Invalid Achievement" });
    }
    next();
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
    modernisationprojectsData,
};
