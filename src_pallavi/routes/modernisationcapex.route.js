const express=require("express");
const controller=require("../controllers/modernisationcapex.controller.js")
const validation =require("../validations/modernisationcapex.validation.js")
const auth=require("../middleware/auth/auth.js")
const router=express.Router();

router.post("/add-modernisationcapexData",[auth.verifyToken],validation.addmodernisationcapexData,controller.modernisationcapexData);
router.get("/getAll-modernisationcapexData",[auth.verifyToken],controller.getAllmodernisationcapexData);



module.exports=router;
