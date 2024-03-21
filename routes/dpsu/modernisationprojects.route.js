const express=require("express");
const controller=require("../../controllers/dpsu/modernisationprojects.controller.js")
const validation =require("../../validations/dpsu/modernisationprojects.validation.js")
const auth=require("../../middleware/auth/auth.js")
const router=express.Router();

router.post("/add-modernisationprojectsData",[auth.verifyToken],validation.modernisationprojectsData,controller.modernisationprojectsData);
router.get("/getAll-modernisationprojectsData",[auth.verifyToken],controller.getAllmodernisationprojectsData);



module.exports=router;
