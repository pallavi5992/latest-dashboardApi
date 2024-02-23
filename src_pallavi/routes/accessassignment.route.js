const express=require("express");
const controller=require("../controllers/accessassignment.controller");
const auth=require("../middleware/auth/auth");
const validation=require("../validations/accessAssessment.validation")
const router=express.Router();

router.post("/add-accessassignment",[auth.verifyToken,auth.isSuperAdminAdmin],validation.addAccess,controller.accessAssignment);
router.get("/get-access-assessment-user",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getAccessAssessmentUser);
module.exports=router;












