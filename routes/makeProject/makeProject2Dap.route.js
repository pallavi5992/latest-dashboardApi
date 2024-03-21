const express = require ('express');
const router= express.Router();
const controller = require("../../controllers/makeProject/makeProject2Dap.controller");
const validation = require('../../validations/makeProject/makeProject2Dap.validation');
const auth=require("../../middleware/auth/auth");
; 

router.post('/add-makeProject2DAP',[auth.verifyToken,auth.isSuperAdminAdmin],[validation.addmakeProject2DAP],controller.addmakeProject2DAP)
router.get("/get-All-Project2DAP",[auth.verifyToken,auth.isSuperAdminAdminOrMakeProjectModule],controller.getAllProject2DAP);
router.get("/get-by-id-makeProject2DAP/:M2PDPPID",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getByIDmakeProject2DAP);
router.patch('/update-makeProject2DAP/:M2PDPPID',[auth.verifyToken,auth.isSuperAdminAdmin],controller.updatemakeProject2DAP)
router.delete('/delete-makeProject2DAP/:M2PDPPID',[auth.verifyToken,auth.isSuperAdminAdmin], controller.deletemakeProject2DAP);

module.exports =router