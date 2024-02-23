const express = require ('express')
const router= express.Router()
const controller = require('../../controllers/makeProject/makeProject1.controller')
const auth=require("../../middleware/auth/auth");
; 

router.post('/add-makeProject-one',[auth.verifyToken,auth.isSuperAdminAdmin],controller.addmakeProject1)
router.get('/get-search-makeProject-one',[auth.verifyToken,auth.isSuperAdminAdminOrMakeProjectModule],controller.getallmakeProject1)
router.get('/get-make-project-by-id-one',[auth.verifyToken,auth.isSuperAdminAdmin],controller.getMakeProjectById1)
router.patch('/update-make-project-one/:id',[auth.verifyToken,auth.isSuperAdminAdmin],controller.updatemakeProject1)
router.delete('/delete-makeProject-one/:id',[auth.verifyToken,auth.isSuperAdminAdmin], controller.deletemakeProject1);


module.exports =router