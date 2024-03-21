const express = require ('express');
const router= express.Router();
const controller = require("../controllers/upDefenceCorridor.controller");
const validation = require('../validations/upDefenceCorridor.validation');
const auth=require("../middleware/auth/auth"); 

router.post('/add-up-defence-corridor',[auth.verifyToken,auth.isSuperAdminAdmin],validation.addupdefencecorridor,controller.addupdefencecorridor)
router.get("/get-All-up-defence-corridor",[auth.verifyToken,auth.isSuperAdminAdminUPCorridorModule],controller.getAllupdefencecorridor);
router.get("/get-by-id-up-defence-corridor/:id",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getByIdupdefencecorridor);
router.patch('/update-up-defence-corridor/:id',[auth.verifyToken,auth.isSuperAdminAdmin],controller.updateupdefencecorridor)
router.delete('/delete-up-defence-corridor/:id',[auth.verifyToken,auth.isSuperAdminAdmin],controller.deleteupdefencecorridor);

router.post('/add-up-InvesmentDefence-corridor',[auth.verifyToken,auth.isSuperAdminAdmin],validation.addUpInvestmentDefecneCorridor,controller.addUpInvestmentDefecneCorridor)
router.get("/get-Up-Single-data-Investment-corridor",controller.getUpSingleDataInvestmentDefence);
router.get("/get-All-up-Dashboarddata-defence-corridor",controller.getAlldashboardData);





module.exports =router


