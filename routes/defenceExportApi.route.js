const express =require('express')
const controller =require('../controllers/defenceExportApi.controller')
const validation = require('../validations/defenceExportApi.validation')
const router =express.Router()
const auth =require('../middleware/auth/auth')


router.post("/add-defence-export-api", [auth.verifyToken,auth.isSuperAdminAdmin],validation.addDefenceExportApiConfig,controller.addDefenceExportApiConfig );
router.get('/get-all-defence-export-api', [auth.verifyToken,auth.isSuperAdminAdminOrExportModule],controller.getAlldefenceExportApiConfig);


router.get('/get-single-defence-export-data',controller.getSingledefenceExportData);
router.get('/get-defence-export-percentage-data',controller.getPercentDefenceExportData);
router.get('/get-last-updated-defence-export-data',controller.getAllLastUpadtedefenceExport);
module.exports = router