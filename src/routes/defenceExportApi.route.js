const express =require('express')
const controller =require('../controllers/defenceExportApi.controller')
const validation = require('../validations/defenceExportApi.validation')
const router =express.Router()
const auth =require('../middleware/auth/auth')


router.post("/add-defence-export-api", [auth.verifyToken,auth.isSuperAdminAdmin],validation.addDefenceExportApiConfig,controller.addDefenceExportApiConfig );
router.get('/get-all-defence-export-api', [auth.verifyToken,auth.isSuperAdminAdminOrExportModule],controller.getAlldefenceExportApiConfig);
router.get('/get-single-defence-export-data', [auth.verifyToken],controller.getSingledefenceExportData);
module.exports = router