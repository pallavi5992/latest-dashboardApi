const express=require("express");
const controller=require("../controllers/user.controller")
const validation=require("../validations/user.validation")
const auth=require("../middleware/auth/auth")
const router=express.Router();

router.post("/add-user",[auth.verifyToken,auth.isSuperAdminAdmin],validation.addUser,controller.addUser);
router.get("/get-all-user",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getAllUserData);
router.delete("/delete-user",[auth.verifyToken,auth.isSuperAdminAdmin],validation.deleteUser,controller.deleteUser);
router.patch("/update-user-by-token",[auth.verifyToken],validation.updateUserByToken,controller.updateUserByToken);
router.get("/get-user-by-token",[auth.verifyToken],controller.getUserByToken);
router.patch("/update-user-by-id",[auth.verifyToken,auth.isSuperAdminAdmin],validation.updateUserById,controller.updateUserById);
router.get("/get-user-by-id",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getUserById);
router.get("/get-all-user-name-id",[auth.verifyToken,auth.isSuperAdminAdmin],controller.getAllUserNameId);
router.get("/search-user/:key",[auth.verifyToken,auth.isSuperAdminAdmin],controller.searchUser);
module.exports=router; 