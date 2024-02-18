import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { validateProduct } from "../../util/validateProduct";
import "./AddEditProduct.css";
import { useParams } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";

const DEFAULT_VERSION = {
  size: "",
  color: "",
  quantity: 0,
};

export const AddEditProduct = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const isEditMode = !!id;
  const { products, createNewProduct, updateProduct } = useProduct();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    colors: [],
    sizes: [],
  });

  const [productVersions, setProductVersions] = useState([
    { ...DEFAULT_VERSION },
  ]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode && products.length > 0) {
      const product = products.find((product) => product._id === id);
      if (!product) {
        alert("Product not found");
        return;
      }

      setFormData({
        name: product.name,
        price: product.price,
        image: product.image,
        sizes: product.sizes,
        colors: product.colors,
        description: product.description,
      });

      setProductVersions(product.stock);
    } else if (!isEditMode) {
      setFormData({
        name: "",
        price: "",
        image: "",
        description: "",
      });
      setProductVersions([{ ...DEFAULT_VERSION }]);
    }
  }, [isEditMode, id, products]);

  const handleAddVersion = () => {
    setProductVersions((prevVersions) => [
      ...prevVersions,
      { ...DEFAULT_VERSION },
    ]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ ...formData, versions: productVersions });
    const errors = validateProduct({ ...formData, versions: productVersions });

    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      return setErrors(errors);
    }

    try {
      if (isEditMode) {
        await updateProduct(id, {
          name: formData.name,
          price: formData.price,
          image: formData.image,
          sizes: formData.sizes,
          colors: formData.colors,
          description: formData.description,
          stock: productVersions,
        });
      } else {
        await createNewProduct({
          name: formData.name,
          price: formData.price,
          image: formData.image,
          sizes: formData.sizes,
          colors: formData.colors,
          description: formData.description,
          stock: productVersions,
        });
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Error submitting product: " + error.message);
    }
  };

  return (
    <div className="product-form-container">
      <h2>{isEditMode ? "Edit Product" : "Add a New Product"}</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="details">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </label>

          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <p className="error">{errors.price}</p>}
          </label>

          <label>
            Image Link:
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
            {errors.image && <p className="error">{errors.image}</p>}
          </label>

          <label className="description">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </label>
        </div>
        <div className="versions-grid">
          <label>Size</label>
          <label>Color</label>
          <label>Stock</label>

          {productVersions.map((version, index) => (
            <React.Fragment key={index}>
              <div>
                <input
                  type="text"
                  name="size"
                  value={version.size}
                  onChange={(e) => {
                    const newVersions = [...productVersions];
                    newVersions[index].size = e.target.value;
                    setProductVersions(newVersions);
                  }}
                />
                {errors.size && <p className="error">{errors.size}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="color"
                  value={version.color}
                  onChange={(e) => {
                    const newVersions = [...productVersions];
                    newVersions[index].color = e.target.value;
                    setProductVersions(newVersions);
                  }}
                />
                {errors.color && <p className="error">{errors.color}</p>}
              </div>
              <div>
                <input
                  type="number"
                  name="stock"
                  value={version.quantity}
                  onChange={(e) => {
                    const newVersions = [...productVersions];
                    newVersions[index].quantity = e.target.value;
                    setProductVersions(newVersions);
                  }}
                />
                {errors.stock && <p className="error">{errors.stock}</p>}
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="product-actions">
          <Button
            className="addVersion"
            type="button"
            onClick={handleAddVersion}
          >
            Add product version
          </Button>

          <Button type="submit">
            {isEditMode ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};
