import Button from "../Button/Button";
import "./Catalog.css";
import "./Search.css";
import { useProduct } from "../../context/ProductContext";
import { useRef } from "react";

export default function Search() {
  const {
    searchProduct,
    filterProduct,
    sizes,
    colors,
    searchTerm,
    setSearchTerm,
  } = useProduct();
  const searchInputRef = useRef();

  function filterColor(event) {
    const selectedColor = event.target.value;
    filterProduct("color", selectedColor);
  }

  function filterSize(event) {
    const selectedSize = event.target.value;
    filterProduct("size", selectedSize);
  }
  return (
    <div>
      <input
        placeholder="Search..."
        className="searchField"
        ref={searchInputRef}
      ></input>

      <Button
        className="search"
        onClick={() => setSearchTerm(searchInputRef.current.value)}
      >
        Search
      </Button>
      <h4 className="filterHeader">Filter</h4>
      <select className="filterDropdown" onChange={filterColor}>
        <option value="">Filter by Color</option>
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
      <select className="filterDropdown" onChange={filterSize}>
        <option value="">Filter by Size</option>
        {sizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}
