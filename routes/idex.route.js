const express = require ('express');
const router= express.Router();
const controller = require("../controllers/idex.controller");
const validation = require('../validations/idex.validation');
const auth=require("../middleware/auth/auth"); 

router.post('/add-Idex-statup-defence',[auth.verifyToken,auth.isSuperAdminAdmin],validation.addIdexstartupdefence,controller.addIdexstartupdefence)
router.get("/get-All-Idex-statup-defence",[auth.verifyToken,auth.isSuperAdminAdminOriDEXModule],controller.getAllIdexstartupdefence);
router.get("/get-by-id-Idex-statup-defence/:id",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getByIDIdexstartupdefence);
router.patch('/updateIdex-statup-defence/:id',[auth.verifyToken,auth.isSuperAdminAdmin],controller.updatemakeIdexstartupdefence)
router.delete('/delete-Idex-statup-defence/:id',[auth.verifyToken,auth.isSuperAdminAdmin],controller.deleteIdexstartupdefence);

module.exports =router