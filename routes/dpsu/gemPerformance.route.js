const express=require("express");
const controller=require("../../controllers/dpsu/gemPerformance.controller.js")
const validation =require("../../validations/dpsu/gemPerformance.validation.js")
const auth=require("../../middleware/auth/auth.js")
const router=express.Router();

router.post("/add-gemPerformanceData",[auth.verifyToken],validation.addgemPerformanceData,controller.addgemPerformanceData);
router.get("/getAll-getAllgemPerformanceData",[auth.verifyToken],controller.getAllgemPerformanceData);
// router.get("/get-getProfitabilityById/:ProfitabilityID",[auth.verifyToken],controller.getProfitabilityById);
//  router.put("/update-profitabilityById/:ProfitabilityID",[auth.verifyToken],validation.updateprofitabilityData,controller.updateProfitabilityById);
// router.put("/delete-profitabilityById/:ProfitabilityID",[auth.verifyToken],controller.deleteProfitabilityById);

// router.get("/percentage-org",controller.pieChartProfit);


module.exports=router;
