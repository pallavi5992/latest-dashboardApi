const express=require("express");
const controller=require("../controllers/discMaster.controller");
const auth=require("../middleware/auth/auth");
const router=express.Router();

router.post("/add-disc-master",[auth.verifyToken,auth.isSuperAdminAdmin],controller.addDiscMaster);
router.get("/get-all-disc-master",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getAllDiscMaster);
module.exports=router;












