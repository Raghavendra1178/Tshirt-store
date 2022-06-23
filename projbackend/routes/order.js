const express=require("express");
const router=express.Router();

const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth");
const {getUserById,pushOrderInPurchaseList, getUser}=require("../controllers/user");
const {getOrderById,createOrder,getAllOrders,getOrderStatus,updateStatus}=require("../controllers/order");
const {updateStock}=require("../controllers/product");
const { route } = require("./auth");

router.param("userId",getUserById);
router.param("orderId",getOrderById);

router.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder);

router.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrders);

//status of orders
router.get("/order/status/:userId",isSignedIn,isAuthenticated.apply,isAdmin,getOrderStatus);
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus);

module.exports=router;