const db = require("../models");
const prProduction = db.prProduction;
const FyYear = db.tblYear
const Organisation= db.organisation

const checkIfProdExists = async (organisationID, YearID, quarter) => {
  try {
    const existingRecord = await prProduction.findOne({
      where: {
        OrganisationID: organisationID,
        YearID: YearID,
        Quarter: quarter,
      },
    });

    return !!existingRecord; // Return true if the record exists, false otherwise
  } catch (error) {
    console.error('Error checking if record exists:', error);
    return false;
  }
};
const addprPerformance = async (req, res, next) => {
  try {
    const { OrganisationID, Cumulative, YearID, Quarter, Remarks } = req.body;
    if (!OrganisationID) {
      return res
        .status(400)
        .send({ status: false, message: "Please select organisation" });
    } else if (!Cumulative) {
      return res.status(400).send({
        status: false,
        message: "Please Enter Cumulative!",
      });
    } else if (!YearID) {
      return res.status(400).send({
        status: false,
        message: "Please select data year!",
      });
    } else if (!Quarter) {
      return res.status(400).send({
        status: false,
        message: "Please select Quarter!",
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
    const FyYearExist = await FyYear.findOne({
        where: {
            YearID : YearID,
        },
      });
      if (!FyYearExist) {
        return res
          .status(400)
          .send({ status: false, message: "Financial Year not exist" });
      }
      const quarter = [1,2,3,4]
      const checkquarter = quarter.includes(Quarter)

      if(!checkquarter){
        return res
        .status(400)
        .send({ status: false, message: "Invalid Quarter" });
      }
  
      const recordExists = await checkIfProdExists(OrganisationID, YearID, Quarter);
      if (recordExists) {
        return res
        .status(400)
        .send({ status: false, message: "Record already exists." });
      } 

        next();

        
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};


const updateprPerformance = async (req,res,next)=>{
try{
  const { OrganisationID, Cumulative ,YearID, Quarter, Remarks } = req.body;
  if (!OrganisationID) {
    return res
      .status(400)
      .send({ status: false, message: "Please select organisation" });
  } else if (!Cumulative ) {
    return res.status(400).send({
      status: false,
      message: "Please Enter Cumulative !",
    });
  } else if (!YearID) {
    return res.status(400).send({
      status: false,
      message: "Please select data year!",
    });
  } else if (!Quarter) {
    return res.status(400).send({
      status: false,
      message: "Please select Quarter!",
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
  const FyYearExist = await FyYear.findOne({
      where: {
          YearID : YearID,
      },
    });
    if (!FyYearExist) {
      return res
        .status(400)
        .send({ status: false, message: "Financial Year not exist" });
    }
    const quarter = [1,2,3,4]
    const checkquarter = quarter.includes(Quarter)

    if(!checkquarter){
      return res
      .status(400)
      .send({ status: false, message: "Invalid Quarter" });
    }

    const recordExists = await checkIfProdExists(OrganisationID, YearID, Quarter);
    if (recordExists) {
      return res
      .status(400)
      .send({ status: false, message: "Record already exists." });
    } 

      next();
} catch (error) {
  return res.status(500).send({ status: false, message: error.message });
}
}
module.exports = {
  addprPerformance,
  updateprPerformance
};
