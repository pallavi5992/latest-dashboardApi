const express = require ('express');
const router= express.Router();
const controller = require("../../controllers/makeProject/makeProject2Dpsu.controller");
// const validation = require('../../validations/makeProject/makeProject2Dap.validation');
const auth=require("../../middleware/auth/auth"); 

router.post('/add-makeProject2dpsu',[auth.verifyToken,auth.isSuperAdminAdmin],controller.addmakeProject2Dpsu)
router.get("/get-All-Project2dpsu",[auth.verifyToken,auth.isSuperAdminAdminOrMakeProjectModule],controller.getAllProject2Dpsu);
router.get("/get-by-id-makeProject2dpsu/:id",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getByIDmakeProject2Dpsu);
router.patch('/update-makeProject2dpsu/:id',[auth.verifyToken,auth.isSuperAdminAdmin],controller.updatemakeProject2Dpsu)
router.delete('/delete-makeProject2dpsu/:id',[auth.verifyToken,auth.isSuperAdminAdmin], controller.deletemakeProject2Dpsu);

module.exports =router