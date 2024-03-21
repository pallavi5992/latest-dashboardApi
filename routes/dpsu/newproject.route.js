const express=require("express");
const controller=require("../../controllers/dpsu/newproject.controller.js")
const validation =require("../../validations/dpsu/newproject.validation.js")
const auth=require("../../middleware/auth/auth.js")
const router=express.Router();

router.post("/add-projectData", [auth.verifyToken,auth.isSuperAdminAdmin],validation.addprojectData,controller.projectData);
router.get("/getAll-newProjectData",[auth.verifyToken],controller.getAllProject);
// router.get("/get-orderBookPositionDataById/:OrderBookID",[auth.verifyToken],controller.orderBookPositionDataById);
// router.put("/update-orderBookById/:OrderBookID",[auth.verifyToken],controller.updateOrderBookPositionDataById);
// router.put("/delete-orderBookById/:OrderBookID",[auth.verifyToken],controller.deleteOrderBookById);

router.get("/percentage-org",controller.pieChartProject);


module.exports=router;
