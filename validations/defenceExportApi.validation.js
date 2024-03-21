const db = require("../models");
const addDefenceExportApiConfig = async (req, res, next) => {
  try {
    const {
      fin_year,
      dpsu,
      cmy_cat,
      privatecompanies,
      rdate,
      ContractValue,
    } = req.body;
    if (!fin_year) {
      return res
        .status(400)
        .send({ status: false, message: "Please select Data year!" });
    } else if (!dpsu) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Please Enter the Export By DPSU/OFB!",
        });
    } else if (!cmy_cat) {
      return res
        .status(400)
        .send({ status: false, message: " Please Enter the Scomet!" });
    } else if(!privatecompanies){
        return res
        .status(400)
        .send ({ status : false, message : "Please Enter the Privatecompanies!"})
    }else if(!ContractValue){
         return res 
         .status(400)
         .send({status : false ,message : " Plase Enter the Contract value"})

    }else if(!rdate){
          return res
          .status(400)
          .send({ status:false, message: "Select the Date!"})
    }
    next()
  } catch (error) {}
};

module.exports = {
  addDefenceExportApiConfig,
};
