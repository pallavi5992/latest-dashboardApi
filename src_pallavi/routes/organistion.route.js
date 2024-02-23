const express=require("express");
const controller=require("../controllers/organisation.controller")
const validation =require("../validations/organisation.validation")
const auth=require("../middleware/auth/auth")
const router=express.Router();

router.post("/add-organisation",[auth.verifyToken],validation.addorganisation,controller.addorganisation);
//router.get("/getAll-organisation",[auth.verifyToken],controller.getAllOrganisationData);
router.get("/getAll-organisation",controller.getAllOrganisationData);
router.get("/get-organisation/:OrganisationID",[auth.verifyToken], controller.getByIdOrganisationData);
router.put('/Update-organisation/:OrganisationID',[auth.verifyToken], controller.updateOrganisationData);
router.delete('/delete-organisation/:OrganisationID',[auth.verifyToken], controller.deleteOrganisation);
router.get('/Search-organisation/:key',[auth.verifyToken], controller.SearchOrganisation);
router.get('/get-organisation-by-sector-id',[auth.verifyToken], controller.getOrganisationBySectorId);




module.exports=router;
