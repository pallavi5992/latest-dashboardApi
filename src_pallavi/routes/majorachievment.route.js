const express=require("express");
const controller=require("../controllers/majorachievment.controller.js")
const validation =require("../validations/majorachievment.validation.js")
const auth=require("../middleware/auth/auth.js")
const router=express.Router();

router.post("/add-majorachievmentData",[auth.verifyToken],validation.addmajorachievmentData,controller.majorachievmentData);
router.get("/getAll-majorachievmentData",[auth.verifyToken],controller.getAllmajorachievmentData);



module.exports=router;
