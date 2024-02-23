const express=require("express");
const controller=require("../controllers/defenceChallange.controller");
const auth=require("../middleware/auth/auth");
const validation=require("../validations/defenceChallange.validation")
const router=express.Router();

router.post("/add-defence-challange",[auth.verifyToken,auth.isSuperAdminAdmin],validation.addDefenceChallange,controller.addDefenceChallange);
router.get("/get-defence-challange-by-disc-id",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getDefenceChallangeByDiscId)
module.exports=router;