import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { cartService } from "../services/cartService";
import { productService } from "../services/productService";
import { authService } from "../services/authService";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await productService.getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!authService.isLoggedIn()) {
      navigate("/login");
      return;
    }

    try {
      setAddingToCart(true);
      await cartService.addToCart(id, quantity, selectedSize, selectedColor);
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <><Navbar /><main className="container"><p>Loading...</p></main></>;
  if (!product) return <><Navbar /><main className="container"><p>Product not found</p></main></>;

  return (
    <>
      <Navbar />

      <main className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: "18px",
          }}
        >
          <div className="card">
            <img src={product.img} alt={product.name} />
          </div>

          <div className="card">
            <h2>{product.name}</h2>

            <div className="small">Category: {product.category}</div>

            <div style={{ marginTop: "10px" }}>
              <span className="price">${product.discountedPrice}</span>
              {product.discount > 0 && (
                <span className="discount"> {product.discount}% off</span>
              )}
              <span className="small" style={{ marginLeft: "10px" }}>
                (was ${product.price})
              </span>
            </div>

            <p className="small" style={{ marginTop: "12px" }}>
              {product.description}
            </p>

            {product.stock > 0 ? (
              <>
                <div style={{ marginTop: "16px" }}>
                  <label>
                    Size:
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      style={{ marginLeft: "8px", padding: "4px" }}
                    >
                      {product.sizes?.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div style={{ marginTop: "12px" }}>
                  <label>
                    Color:
                    <select
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      style={{ marginLeft: "8px", padding: "4px" }}
                    >
                      {product.colors?.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div style={{ marginTop: "12px" }}>
                  <label>
                    Quantity:
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      style={{ marginLeft: "8px", padding: "4px" }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <button
                  className="btn"
                  style={{ marginTop: "16px" }}
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                >
                  {addingToCart ? "Adding..." : "Add to Cart"}
                </button>
              </>
            ) : (
              <div style={{ marginTop: "16px", color: "red" }}>
                <p>❌ Out of Stock</p>
              </div>
            )}

            <div style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
              <p>Stock Available: {product.stock}</p>
              <p>Material: {product.material}</p>
              <p>Rating: ⭐ {product.rating || 0}/5</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Product;