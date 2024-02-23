const express=require("express");
const controller=require("../controllers/moduleConfig.controller");
const auth=require("../middleware/auth/auth");
const validation=require("../validations/moduleConfig.validation")
const router=express.Router();

router.post("/add-module-config",[auth.verifyToken,auth.isSuperAdminAdmin],validation.addModuleConfig,controller.addModuleConfig);
router.get("/get-module-config-By-module-id",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getModuleConfigByModuleId);
router.patch("/upadte-module-config",[auth.verifyToken,auth.isSuperAdminAdmin],validation.upadteModuleConfig,controller.updateModuleConfig);
router.get("/get-all-module-config",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getAllModuleConfig);
module.exports=router; 