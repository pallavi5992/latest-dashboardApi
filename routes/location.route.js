const express=require("express");
const controller=require("../controllers/location.controller");
const auth=require("../middleware/auth/auth");
const router=express.Router();

router.post("/add-location",[auth.verifyToken,auth.isSuperAdminAdmin],controller.addLoaction);
router.get("/get-all-location",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getAllLocation);
module.exports=router;