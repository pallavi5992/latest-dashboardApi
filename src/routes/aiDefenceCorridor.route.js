const express = require ('express');
const router= express.Router();
const controller = require("../controllers/aiDefenceCorridor.controller");
const validation = require('../validations/aiDefenceCorridor.validation')
const auth=require("../middleware/auth/auth"); 

router.post('/add-Ai-defence-corridor',[auth.verifyToken,auth.isSuperAdminAdmin],controller.addAidefencecorridor)
router.get("/get-All-AI-defence-corridor",[auth.verifyToken,auth.isSuperAdminAdminAIModule],controller.getAllAidefencecorridor);
router.get("/get-by-id-AI-defence-corridor/:id",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getByIdAidefencecorridor);
router.patch('/update-Ai-defence-corridor/:id',[auth.verifyToken,auth.isSuperAdminAdmin],controller.updateAidefencecorridor)
router.delete('/delete-Ai-defence-corridor/:id',[auth.verifyToken,auth.isSuperAdminAdmin],controller.deleteAidefencecorridor);

module.exports =router


