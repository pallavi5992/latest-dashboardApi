const express=require("express");
const controller=require("../controllers/defenceProduction.controller");
const validation=require("../validations/defenceProduction.validation")
const auth=require("../middleware/auth/auth");
const router=express.Router();

router.post("/add-add-defence-production",[auth.verifyToken,auth.isSuperAdminAdmin],[validation.adddefenceProduction],controller.adddefenceProduction);
router.get("/get-all-defence-production-data",[auth.verifyToken,auth.isSuperAdminAdminOrDefenceProductionModule],controller.getAllDefenceProductionData);
router.patch('/update-defenceproduction/:DefenceProductionID',[auth.verifyToken,auth.isSuperAdminAdmin],controller.updatedefenceProduction);
router.get('/get-defenceproductionbyId/:DefenceProductionID',[auth.verifyToken,auth.isSuperAdminAdmin], controller.getByIddefenceProduction);
router.delete('/delete-defenceproduction/:DefenceProductionID',[auth.verifyToken,auth.isSuperAdminAdmin], controller.deletedefenceProduction);

router.get('/getdefenceProductionData', controller.getdefenceProductionData);
router.get('/get-defence-production-percentage-data',controller.getPercentDefenceProductionData);
router.get('/get-defence-production-latest-data',controller.getAllLastUpadtedefenceProduction);
router.get('/get-defence-production-piechart-data',controller.pieChartDefenceProd);
module.exports=router;












