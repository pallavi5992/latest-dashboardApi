const express = require ('express');
const router= express.Router();
const controller = require("../../controllers/makeProject3/makeProject3Dpsu.controller");
const validation = require('../../validations/makeProject3/makeProject3Dpsu.validation');
const auth=require("../../middleware/auth/auth"); 

router.post('/add-makeProject3dpsu',[auth.verifyToken,auth.isSuperAdminAdmin],[validation.addmakeProject3DPSU],controller.addmakeProject3DPSU)
router.get("/get-All-Project3dpsu",[auth.verifyToken,auth.isSuperAdminAdminOrMakeProjectModule],controller.getAllProject3Dpsu);
router.get("/get-by-id-makeProject3dpsu/:id",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getByIDmakeProject3Dpsu);
router.patch('/update-makeProject3dpsu/:id',[auth.verifyToken,auth.isSuperAdminAdmin],controller.updatemakeProject3Dpsu)
router.delete('/delete-makeProject3dpsu/:id',[auth.verifyToken,auth.isSuperAdminAdmin], controller.deletemakeProject3Dpsu);
module.exports =router;
