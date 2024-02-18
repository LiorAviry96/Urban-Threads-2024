const express = require("express");
const { userController } = require("../controllers/user-controller");

const userRouter = express.Router();

userRouter.get("/", userController.getUser);
userRouter.post("/login", userController.login);
userRouter.post("/signup", userController.createUser);
userRouter.get("/:email", userController.getUserByEmail);
userRouter.post("/addtocart", userController.addProductToCart);
userRouter.post("/updatequantity", userController.updateProductQuantity);
userRouter.post("/removequantity", userController.removeProductQuantity);
userRouter.post("/removeitem", userController.removeItemFromCart);
module.exports = { userRouter };
