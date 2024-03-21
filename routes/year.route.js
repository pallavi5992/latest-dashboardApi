const express=require("express");
const validation =require("../validations/year.validation")
const controller=require("../controllers/year.controller")
const auth=require("../middleware/auth/auth")
const router=express.Router();

router.post("/add-financialYear",[auth.verifyToken],validation.addFy,controller.addFinancialYear);
router.get("/getAll-financialYear",[auth.verifyToken],controller.getAllfinancialYear);
router.get("/get-financialYearByID/:yearID",[auth.verifyToken],controller.getFinancialYearById);
router.put("/Update-financialYear/:yearID",[auth.verifyToken],validation.addFy,controller.updateFyYearData);
router.delete('/delete-fy/:yearID',[auth.verifyToken],controller.deleteYear);
module.exports=router;
