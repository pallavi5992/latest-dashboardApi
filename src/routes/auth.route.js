const express=require("express");
const controller=require("../controllers/auth.contoller")
const validation=require("../validations/auth.validation");
const auth=require("../middleware/auth/auth")
const router=express.Router();

router.post("/login",validation.login,controller.login);
router.post("/logout",[auth.verifyToken],controller.logout);
router.post("/forgotPassword",controller.forgotPassword);
router.patch("/resetPasswordRequest/:token",controller.resetPasswordRequest);
module.exports=router;