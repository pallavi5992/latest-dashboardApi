const express = require ('express')
const router= express.Router()
const controller = require('../../controllers/makeProject/makeProject.controller')
const validation = require('../../validations/makeProject/makeProject.validation')
const auth=require("../../middleware/auth/auth");
; 

router.post('/add-makeProject',[auth.verifyToken,auth.isSuperAdminAdmin],[validation.addmakeProject],controller.addmakeProject)
router.get('/get-search-makeProject',[auth.verifyToken,auth.isSuperAdminAdminOrMakeProjectModule],controller.getallmakeProject)
router.get('/get-make-project-by-id',[auth.verifyToken,auth.isSuperAdminAdmin],controller.getMakeProjectById)
router.patch('/update-make-project/:M2PID',[auth.verifyToken,auth.isSuperAdminAdmin],controller.updatemakeProject)
router.delete('/delete-makeProject/:M2PID',[auth.verifyToken,auth.isSuperAdminAdmin], controller.deletemakeProject);


module.exports =router