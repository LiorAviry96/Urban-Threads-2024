import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

const ProductContext = createContext(null);

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    color: "",
    size: "",
  });

  const isSearching = searchTerm.length > 0 || filter.color || filter.size;

  const navigator = useNavigate();

  const fetchProducts = async (searchTerm, size, color) => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.append("search", searchTerm);
    }
    if (size) {
      params.append("size", size);
    }
    if (color) {
      params.append("color", color);
    }
    const response = await fetch(BASE_URL + "/products?" + params.toString());

    const data = await response.json();
    if (!searchTerm && !size && !color) {
      const colors = [];
      const sizes = [];
      for (const { stock } of data.products) {
        for (const { color, size, quantity } of stock) {
          if (quantity > 0) {
            colors.push(color);
            sizes.push(size);
          }
        }
      }
      setColors([...new Set(colors)]);
      setSizes([...new Set(sizes)]);

      setProducts(data.products);
      setSearchResults([]);
    } else {
      setSearchResults(data.products);
    }
  };

  useEffect(() => {
    fetchProducts(searchTerm, filter.size, filter.color);
  }, [searchTerm, filter.color, filter.size]);

  const filterProduct = (by, value) => {
    setFilter((prev) => ({ ...prev, [by]: value }));
  };

  const getProductById = (id) => {
    return products?.find((p) => p._id === id);
  };

  const getProductByVersionId = (id) => {
    const product = products?.find((p) =>
      p.stock.find((version) => version._id === id)
    );
    const version = product?.stock.find((version) => version._id === id);
    return { product, version };
  };

  const createNewProduct = async (formData) => {
    try {
      const response = await fetch(BASE_URL + "/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Product submitted successfully!");
        fetchProducts();
        navigator("/");
      } else {
        console.error("Product submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  const updateProduct = async (productId, updatedData) => {
    try {
      const response = await fetch(BASE_URL + `/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        console.log("Product updated successfully!");
        toast.success("Product updated successfully!");
        fetchProducts();
      } else {
        console.error("Product update failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(BASE_URL + `/products/${productId}`, {
        method: "DELETE",
      });
      console.log(response);
      if (response.ok) {
        console.log("Product deleted successfully!");
        fetchProducts();
        navigator("/");
      } else {
        console.error("Product deletion failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        searchResults,
        isSearching,
        colors,
        sizes,
        searchTerm,
        setSearchTerm,
        fetchProducts,
        filterProduct,
        getProductById,
        getProductByVersionId,
        createNewProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("Product context not provided");
  }
  return context;
};
