const db = require("../models");
const Module = db.module;

const addmodule = async (req, res) => {
  try {
 
    const {
         ModuleID,
         ModuleName,
        } = req.body;
    const userId=req.userId
    const isModuleExist = await Module.findOne({
      where: {
        ModuleName: ModuleName,
      },
    });
    if (isModuleExist) {
      return res
        .status(400)
        .send({ status: false, message: "Module already exist!" });
    }

    await Module.create({
      ModuleID: ModuleID,
      ModuleName: ModuleName,
      ModifiedOn: new Date(),
      ModifiedBy:userId||"",
    });
    return res
      .status(200)
      .send({ status: true, massasge: "Add Module successfully" });
  } catch (error) {
    return res.status(500).send({ status: false, massage: error.massage });
  }
};



const getAllModule=async(req,res)=>{
  try {
    const getModule=await Module.findAll({
      attributes:["ModuleID","ModuleName"]
    });
    return res.status(200).send({ status: true, data:getModule });

  } catch (error) {
    return res.status(500).send({ status: false, massage: error.massage });
  }
}

module.exports = {
  addmodule,
  getAllModule
};
