const express=require("express");
const controller=require("../../controllers/dpsu/idexmakeproject.controller.js")
const validation =require("../../validations/dpsu/idexmakeproject.validation.js")
const auth=require("../../middleware/auth/auth.js")
const router=express.Router();

router.post("/add-idexmakeprojectData",[auth.verifyToken],validation.addidexmakeprojectData,controller.addidexmakeprojectData);
router.get("/getAll-idexProjectData",[auth.verifyToken],controller.getAllIdexProjectData);
// router.get("/get-getProfitabilityById/:ProfitabilityID",[auth.verifyToken],controller.getProfitabilityById);
//  router.put("/update-profitabilityById/:ProfitabilityID",[auth.verifyToken],validation.updateprofitabilityData,controller.updateProfitabilityById);
// router.put("/delete-profitabilityById/:ProfitabilityID",[auth.verifyToken],controller.deleteProfitabilityById);


router.get("/percentage-org",controller.pieChartIdex);


module.exports=router;
