const express = require ('express');
const router= express.Router();
const controller = require("../controllers/tnDefenceCorridor.controller");
const validation = require('../validations/tnDefenceCorridor.validation');
const auth=require("../middleware/auth/auth"); 

router.post('/add-tn-defence-corridor',[auth.verifyToken,auth.isSuperAdminAdmin],validation.addTndefencecorridor,controller.addTndefencecorridor)
router.get("/get-All-tn-defence-corridor",[auth.verifyToken,auth.isSuperAdminAdminTNCorridorModule],controller.getAllTndefencecorridor);
router.get("/get-by-id-tn-defence-corridor/:id",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getByTndefencecorridor);
router.patch('/update-tn-defence-corridor/:id',[auth.verifyToken,auth.isSuperAdminAdmin],controller.updateTndefencecorridor)
router.delete('/delete-tn-defence-corridor/:id',[auth.verifyToken,auth.isSuperAdminAdmin],controller.deleteTndefencecorridor);

router.post('/add-Tn-InvesmentDefence-corridor',[auth.verifyToken,auth.isSuperAdminAdmin],validation.addTnInvestmentDefecneCorridor,controller.addTnInvestmentDefecneCorridor)
router.get("/get-Tn-Single-data-Investment-corridor",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getTnSingleDataInvestmentDefence);

module.exports =router


