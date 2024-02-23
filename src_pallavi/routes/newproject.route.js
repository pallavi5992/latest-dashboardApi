const express=require("express");
const controller=require("../controllers/newproject.controller.js")
const validation =require("../validations/newproject.validation.js")
const auth=require("../middleware/auth/auth.js")
const router=express.Router();

// router.post("/add-orderBookPositionData",[auth.verifyToken],validation.addOrderBookPosition,controller.orderBookPositionData);
// router.get("/getAll-orderBookPositionData",[auth.verifyToken],controller.getAllOrderBookPositionData);
// router.get("/get-orderBookPositionDataById/:OrderBookID",[auth.verifyToken],controller.orderBookPositionDataById);
// router.put("/update-orderBookById/:OrderBookID",[auth.verifyToken],controller.updateOrderBookPositionDataById);
// router.put("/delete-orderBookById/:OrderBookID",[auth.verifyToken],controller.deleteOrderBookById);

// router.get("/percentage-org",controller.pieChartOrganisation);


module.exports=router;
