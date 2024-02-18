const { ProductModel } = require("../models/product-model");

const getProducts = async (req, res) => {
  const { search, size, color } = req.query;

  try {
    const products = await ProductModel.find({
      $or: [
        { name: { $regex: search || "", $options: "i" } },
        { description: { $regex: search || "", $options: "i" } },
      ],
      stock: {
        $elemMatch: {
          size: { $regex: size || "", $options: "i" },
          color: { $regex: color || "", $options: "i" },
        },
      },
    });

    res.json({ products });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ success: false, message: "Error getting products" });
  }
};

const createProduct = async (req, res) => {
  const { name, price, image, description, stock } = req.body;

  try {
    const newProduct = new ProductModel({
      name,
      price,
      image,
      description,
      stock,
    });

    await newProduct.save();

    res.json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Error creating product" });
  }
};
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, price, image, description, stock } = req.body;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        name,
        price,
        image,
        description,
        stock,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Error updating product" });
  }
};
const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Error deleting product" });
  }
};
const productController = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

module.exports = { productController };
