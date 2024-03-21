const express = require ('express')
const router =express.Router()
const controller =require('../controllers/defenceOffset.controller')
const auth=require("../middleware/auth/auth");

// offline routes
router.get("/addDefenceOffsetOffline/:dataStatus/:ip",[auth.verifyToken,auth.isSuperAdminAdminOrOffsetModule],controller.addDefenceOffsetOfflinedata)
router.get("/get-all-defence-offset-offine-data",[auth.verifyToken,auth.isSuperAdminAdminOrOffsetModule],controller.getAllDefenceOffsetOffineData)
router.get("/searchDefenceOffsetOfflinedata/:key",[auth.verifyToken,auth.isSuperAdminAdminOrOffsetModule],controller.searchDefenceOffsetOfflinedata)

// online Routes
router.get("/addDefenceOffsetOnline",[auth.verifyToken,auth.isSuperAdminAdminOrOffsetModule],controller.addDefenceOffsetOnlinedata)
router.get("/get-all-defence-offset-online-data",[auth.verifyToken,auth.isSuperAdminAdminOrOffsetModule],controller.getAllDefenceOffsetOnlineData)
router.get("/searchDefenceOffsetOnline/:key",[auth.verifyToken,auth.isSuperAdminAdminOrOffsetModule],controller.searchDefenceOffsetOnline)

// YEARLY ROUTES
router.get("/addDefenceOffsetOffyearly",controller.DefenceOffSetYearlyData)
router.get("/getDefenceOffsetOffyearly",[auth.verifyToken,auth.isSuperAdminAdminOrOffsetModule],controller.getDefenceOffsetYearlyData)
router.get('/Search-DefenceOffsetOffyearly/:key',[auth.verifyToken,auth.isSuperAdminAdminOrOffsetModule], controller.searchDefenceOffsetYearlyData);


// for Dashboard
router.get('/offsetDataForDashboard', controller.offsetDataForDashboard);
router.get('/get-defence-offset-percentage-data',controller.offsetPublicGraphDataGet);
module.exports =router
