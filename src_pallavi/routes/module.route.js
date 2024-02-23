const express=require("express");
const controller=require("../controllers/module.controller");
const auth=require("../middleware/auth/auth")
const router=express.Router();

router.post("/add-module",[auth.verifyToken,auth.isSuperAdminAdmin],controller.addmodule);
router.get("/get-all-module",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getAllModule);


module.exports=router;










