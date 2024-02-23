const express=require("express");
const controller=require("../controllers/profitability.controller.js")
const validation =require("../validations/profitability.validation.js")
const auth=require("../middleware/auth/auth.js")
const router=express.Router();

router.post("/add-addprofitabilityData",[auth.verifyToken],validation.addprofitabilityData,controller.addprofitabilityData);
router.get("/getAll-profitabilityData",[auth.verifyToken],controller.getAllProfitabilityData);
router.get("/get-getProfitabilityById/:ProfitabilityID",[auth.verifyToken],controller.getProfitabilityById);
 router.put("/update-profitabilityById/:ProfitabilityID",[auth.verifyToken],validation.updateprofitabilityData,controller.updateProfitabilityById);
router.put("/delete-profitabilityById/:ProfitabilityID",[auth.verifyToken],controller.deleteProfitabilityById);

router.get("/percentage-org",controller.pieChartProfit);


module.exports=router;
