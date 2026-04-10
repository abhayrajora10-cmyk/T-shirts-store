import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { productService } from "../services/productService";
import "../styles/home.css";

function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const products = await productService.getFeaturedProducts();
      setFeatured(products || []);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      setError("Failed to load products. Please try again.");
      setFeatured([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Comfortable T-Shirts for Every Style</h1>
            <p className="hero-subtitle">
              Explore our curated collection of premium quality t-shirts — classic, modern, and sustainable options.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate("/category")}>
                Shop Now →
              </button>
              <button className="btn-secondary" onClick={() => document.getElementById('featured').scrollIntoView({ behavior: 'smooth' })}>
                See Featured
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://veirdo.in/cdn/shop/files/ai_creative_0000_Layer_6.jpg"
              alt="T-shirt Collection"
            />
          </div>
        </section>

        {/* Error Alert */}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Featured Section */}
        <section id="featured" className="featured-section">
          <div className="section-header">
            <h2>⭐ Featured T-Shirts</h2>
            <p>Our best-selling and most loved designs</p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading amazing t-shirts...</p>
            </div>
          ) : featured.length > 0 ? (
            <div className="grid">
              {featured.map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No featured products available</p>
              <button className="btn-primary" onClick={fetchFeaturedProducts}>
                Try Again
              </button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Ready to find your perfect fit?</h2>
          <p>Browse our complete collection of 36+ unique designs</p>
          <button className="btn-primary" onClick={() => navigate("/category")}>
            Explore All T-Shirts
          </button>
        </section>
      </main>
    </>
  );
}

export default Home;