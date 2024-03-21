const express=require("express");
const controller=require("../controllers/role.controller")
const validation=require("../validations/role.validation")
const router=express.Router();

router.post("/add-role",validation.addRole,controller.addRole);
router.get("/get-all-role",controller.getAllRole);

module.exports=router;