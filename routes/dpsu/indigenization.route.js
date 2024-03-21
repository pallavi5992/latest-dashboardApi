const express=require("express");
const controller=require("../../controllers/dpsu/indigenization.controller.js")
const validation =require("../../validations/dpsu/indigenization.validation.js")
const auth=require("../../middleware/auth/auth.js")
const router=express.Router();

 router.post("/add-indigenizationData",[auth.verifyToken],validation.addIndigenization,controller.indigenizationData);
router.get("/getAll-indigenizationData",[auth.verifyToken],controller.getAllIndigenizationData);
// router.get("/get-orderBookPositionDataById/:OrderBookID",[auth.verifyToken],controller.orderBookPositionDataById);
// router.put("/update-orderBookById/:OrderBookID",[auth.verifyToken],controller.updateOrderBookPositionDataById);
// router.put("/delete-orderBookById/:OrderBookID",[auth.verifyToken],controller.deleteOrderBookById);

 router.get("/percentage-org",controller.pieChartIndigenization);


module.exports=router;
