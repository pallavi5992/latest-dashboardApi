const express=require("express");
const controller=require("../controllers/organisation.controller")
const validation =require("../validations/organisation.validation")
const auth=require("../middleware/auth/auth")
const router=express.Router();

router.post("/add-organisation",[auth.verifyToken,auth.isSuperAdminAdmin],validation.addorganisation,controller.addorganisation);
router.get("/getAll-organisation",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getAllOrganisationData);
router.get("/get-organisation/:OrganisationID",[auth.verifyToken,auth.isSuperAdminAdmin], controller.getByIdOrganisationData);
router.put('/Update-organisation/:OrganisationID',[auth.verifyToken,auth.isSuperAdminAdmin], controller.updateOrganisationData);
router.delete('/delete-organisation/:OrganisationID',[auth.verifyToken,auth.isSuperAdminAdmin], controller.deleteOrganisation);
router.get('/Search-organisation/:key',[auth.verifyToken,auth.isSuperAdminAdmin], controller.SearchOrganisation);
router.get('/get-organisation-by-sector-id',[auth.verifyToken,auth.isSuperAdminAdmin], controller.getOrganisationBySectorId);
router.get('/get-all-organisation-code',[auth.verifyToken,auth.isSuperAdminAdmin], controller.getAllOrganisationCode);
router.get('/get-all-organisation-id-name',[auth.verifyToken,auth.isSuperAdminAdmin], controller.getAllOrganisationIdName);


module.exports=router;


