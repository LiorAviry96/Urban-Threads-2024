const { UserModel } = require("../models/user-model");

const getUser = async (req, res) => {
  const users = await UserModel.find();
  res.json({ users });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email, password }).select("-password");

  if (user) {
    res.json({ user });
  } else {
    res.status(401).json({ message: "invalid email or password" });
  }
};
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);

    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error getting user name:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createUser = async (req, res) => {
  const { email, password, name, role, cart } = req.body;

  try {
    const newUser = new UserModel({
      email,
      password,
      name,
      role,
      cart,
    });

    await newUser.save();

    res.json({
      success: true,
      message: "Product created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Error creating user" });
  }
};
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await UserModel.findOne({ email });

    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error getting user email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addProductToCart = async (req, res) => {
  const {
    userId,
    item: { versionId },
  } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const existingProduct = user.cart.find((item) =>
      item.versionId.equals(versionId)
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      user.cart.push({
        versionId: versionId,
        quantity: 1,
      });
    }

    await user.save();

    res.json({
      success: true,
      message: "Product added to cart successfully",
      updatedUser: user,
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.json({ success: false, message: "Error adding product to cart" });
  }
};

const updateProductQuantity = async (req, res) => {
  const {
    userId,
    item: { versionId },
  } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    user.cart.map((product) => {
      if (product.versionId.equals(versionId)) {
        product.quantity += 1;
      }
    });
    await user.save();

    res.json({
      success: true,
      message: "Product updated in the cart successfully",
      updatedUser: user,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Error updating cart" });
  }
};
const removeProductQuantity = async (req, res) => {
  const {
    userId,
    item: { versionId },
  } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    user.cart.map((product, index) => {
      if (product.versionId.equals(versionId)) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else if (product.quantity === 1) {
          user.cart.splice(index, 1);
        }
      }
    });
    await user.save();

    res.json({
      success: true,
      message: "Product updated in the cart successfully",
      updatedUser: user,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Error updating cart" });
  }
};
const removeItemFromCart = async (req, res) => {
  const {
    userId,
    item: { versionId },
  } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const itemIndex = user.cart.findIndex((cartItem) =>
      cartItem.versionId.equals(versionId)
    );

    if (itemIndex !== -1) {
      user.cart.splice(itemIndex, 1);
      await user.save();
      res.json({
        success: true,
        message: "Product removed from the cart successfully",
        updatedUser: user,
      });
    } else {
      res.json({ success: false, message: "Product not found in the cart" });
    }
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res
      .status(500)
      .json({ success: false, message: "Error removing product from cart" });
  }
};
const userController = {
  getUser,
  login,
  getUserById,
  addProductToCart,
  updateProductQuantity,
  removeProductQuantity,
  removeItemFromCart,
  getUserByEmail,
  createUser,
};

module.exports = { userController };
