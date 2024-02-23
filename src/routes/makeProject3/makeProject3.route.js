const express = require ('express')
const router= express.Router()
const controller = require('../../controllers/makeProject3/makeProject3.controller')
const validation = require("../../validations/makeProject3/makeProject3.validation")
const auth=require("../../middleware/auth/auth");


router.post('/add-makeProject3',[auth.verifyToken,auth.isSuperAdminAdmin],[validation.addmakeProject3],controller.addmakeProject3)
router.get('/get-search-makeProject3',[auth.verifyToken,auth.isSuperAdminAdminOrMakeProjectModule],controller.getallmakeProject3)
router.get('/get-make-project3-by-id',[auth.verifyToken,auth.isSuperAdminAdmin],controller.getMakeProject3ById)
router.patch('/update-make-project3/:M2PID',[auth.verifyToken,auth.isSuperAdminAdmin],controller.updatemakeProject3)
router.delete('/delete-makeProject3/:M2PID',[auth.verifyToken,auth.isSuperAdminAdmin], controller.deletemakeProject3);


module.exports =router