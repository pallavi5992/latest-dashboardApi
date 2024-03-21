const express=require("express");
const controller=require("../../controllers/dpsu/exportperformance.controller.js")
const validation =require("../../validations/dpsu/exportperformance.validation.js")
const auth=require("../../middleware/auth/auth.js")
const router=express.Router();

router.post("/add-exportperformanceData",[auth.verifyToken],validation.exportperformanceData,controller.exportperformanceData);
 router.get("/getAll-exportperformanceData",[auth.verifyToken],controller.getAllExportperformanceData);
// router.get("/get-orderBookPositionDataById/:OrderBookID",[auth.verifyToken],controller.orderBookPositionDataById);
// router.put("/update-orderBookById/:OrderBookID",[auth.verifyToken],controller.updateOrderBookPositionDataById);
// router.put("/delete-orderBookById/:OrderBookID",[auth.verifyToken],controller.deleteOrderBookById);

router.get("/percentage-org",controller.pieChartExport);


module.exports=router;
