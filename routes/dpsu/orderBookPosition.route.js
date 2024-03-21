const express=require("express");
const controller=require("../../controllers/dpsu/orderBookPosition.controller.js")
const validation =require("../../validations/dpsu/orderBookPosition.validation.js")
const auth=require("../../middleware/auth/auth.js")
const router=express.Router();

router.post("/add-orderBookPositionData",[auth.verifyToken],validation.addOrderBookPosition,controller.orderBookPositionData);
router.get("/getAll-orderBookPositionData",[auth.verifyToken],controller.getAllOrderBookPositionData);
router.get("/get-orderBookPositionDataById/:OrderBookID",[auth.verifyToken],controller.orderBookPositionDataById);
router.put("/update-orderBookById/:OrderBookID",[auth.verifyToken],validation.updateOrderBookPosition,controller.updateOrderBookPositionDataById);
router.put("/delete-orderBookById/:OrderBookID",[auth.verifyToken],controller.deleteOrderBookById);
 router.get("/percentage-org",controller.pieChartOrderBook);

module.exports=router;
