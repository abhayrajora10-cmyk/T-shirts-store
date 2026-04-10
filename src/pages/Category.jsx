import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { productService } from "../services/productService";

const categories = ["Male", "Female", "Uni", "Child", "Teen", "Old"];

function Category() {
  const [activeCat, setActiveCat] = useState("Male");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProductsByCategory(activeCat);
  }, [activeCat]);

  const fetchProductsByCategory = async (category) => {
    try {
      setLoading(true);
      const products = await productService.getProductsByCategory(category);
      setFiltered(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="container">
        <h3>Categories</h3>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className="btn"
              onClick={() => setActiveCat(cat)}
              style={{
                backgroundColor: activeCat === cat ? "#333" : "#f0f0f0",
                color: activeCat === cat ? "white" : "black",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>Loading products...</p>
        ) : filtered.length > 0 ? (
          <div className="grid" style={{ marginTop: "20px" }}>
            {filtered.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>No products found</p>
        )}
      </main>
    </>
  );
}

export default Category;