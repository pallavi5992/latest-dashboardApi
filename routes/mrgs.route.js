const express=require("express");
const controller=require("../controllers/mrgs.controller");
const auth=require("../middleware/auth/auth");
const validation=require("../validations/mrgs.validation")
const router=express.Router();

router.post("/add-mrgs-ipr-target",[auth.verifyToken,auth.isSuperAdminAdmin],[validation.addmrgsIprTarget],controller.addmrgsIprTarget);
router.get("/get-mrgs-ipr-target-By-id/:ID",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getByIdMrgsIprTarget);
router.patch("/upadte-mrgs-ipr-target/:ID",[auth.verifyToken,auth.isSuperAdminAdmin],[validation.updateMrgesIprTargte],controller.updateMrgesIprTargte);
router.get("/get-all-mrgs-ipr-target",[auth.verifyToken,auth.isSuperAdminAdminOrMRGSModule],controller.getAllMrgsIprTarget);

router.post("/add-mrgs-consolidated-Data",[auth.verifyToken,auth.isSuperAdminAdminOrMRGSModule],validation.addmrgsConsolidatedData,controller.addmrgsConsolidatedData);
router.get("/get-mrgs-consolidated-Data-By-id/:ID",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getByIdConsolidatedData);
router.patch("/upadte-mrgs-consolidated-Data/:ID",[auth.verifyToken,auth.isSuperAdminAdmin],validation.updateConsolidatedData,controller.updateConsolidatedData);
router.get("/get-mrgs-consolidated-Data-Year-id/:YearID",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getByyearIDConsolidatedData);

router.get("/get-mrgs-public-data",controller.getsingledatadashboard);
router.get("/get-mrgs-public-table-data",controller.getdashboardTableData);

module.exports=router; 