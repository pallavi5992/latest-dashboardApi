const express =require('express')
const controller =require('../controllers/defenceExportApiConfig.controller')
const validation = require('../validations/defenceExportApi.validation')
const router =express.Router()
const auth =require('../middleware/auth/auth')


router.post("/add-defenceExport-API", [auth.verifyToken],validation.addDefenceExportApiConfig,controller.addDefenceExportApiConfig )
router.get('/get-all-defenceExport-APIData', [auth.verifyToken],controller.getAlldefenceExportApiConfig)
module.exports = router