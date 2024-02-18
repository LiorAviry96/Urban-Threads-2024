import "./Catalog.css";
import Search from "./Search";
import ProductList from "./ProductList";
import { useProduct } from "../../context/ProductContext";
import "./Catalog.css";

export default function Catalog() {
  const { products, searchResults, isSearching } = useProduct();

  const displayProducts = isSearching ? searchResults : products;

  return (
    <div className="catalog">
      <h1 className="header">Urban Threads</h1>
      <h2 className="header2">Clothing Catalog</h2>
      <Search />
      <ProductList products={displayProducts} />
    </div>
  );
}
