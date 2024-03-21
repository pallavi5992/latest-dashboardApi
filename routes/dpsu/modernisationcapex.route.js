const express=require("express");
const controller=require("../../controllers/dpsu/modernisationcapex.controller.js")
const validation =require("../../validations/dpsu/modernisationcapex.validation.js")
const auth=require("../../middleware/auth/auth.js")
const router=express.Router();

router.post("/add-modernisationcapexData",[auth.verifyToken],validation.addmodernisationcapexData,controller.modernisationcapexData);
router.get("/getAll-modernisationcapexData",[auth.verifyToken],controller.getAllmodernisationcapexData);
router.get("/percentage-org",controller.pieChartMordenCapex);


module.exports=router;
