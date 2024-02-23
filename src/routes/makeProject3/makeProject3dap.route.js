const express = require('express')
const router = express.Router();
const controller = require('../../controllers/makeProject3/makeProject3dap.controller')
const auth=require("../../middleware/auth/auth");


   router.post('/add-makeProject3DAP',[auth.verifyToken,auth.isSuperAdminAdmin],controller.admakeProject3DAP)
   router.get('/get-All-Project3DAP',[auth.verifyToken,auth.isSuperAdminAdminOrMakeProjectModule],controller.getAllProject2DAp)
   router.get('/get-by-id-makeProject3DAP/:M2PDPPID',[auth.verifyToken,auth.isSuperAdminAdmin],controller.getbyIDmakeProject3Dap)
   router.patch('/update-makeProject3DAP/:M2PDPPID',[auth.verifyToken,auth.isSuperAdminAdmin],controller.updatemakeProject3DAP)
   router.delete('/delete-makeProject3DAP/:M2PDPPID',[auth.verifyToken,auth.isSuperAdminAdmin],controller.deletemakeProject3Dap)

module.exports= router