import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { cartService } from "../services/cartService";
import { authService } from "../services/authService";
import "../styles/cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingIds, setUpdatingIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Check if user is logged in
      const isLoggedIn = authService.isLoggedIn();
      if (!isLoggedIn) {
        setError("Please login to view your cart");
        navigate("/login", { replace: true, state: { from: "/cart" } });
        return;
      }

      const cart = await cartService.getCart();
      setCartItems(cart?.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);

      if (err?.status === 401) {
        authService.logout();
        navigate("/login", { replace: true, state: { from: "/cart" } });
        return;
      }

      setError("Failed to load cart. Please try again.");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    try {
      setUpdatingIds([...updatingIds, itemId]);
      const updatedCart = await cartService.removeFromCart(itemId);
      setCartItems(updatedCart?.items || []);
    } catch (err) {
      console.error("Error removing from cart:", err);
      setError("Failed to remove item");
    } finally {
      setUpdatingIds(updatingIds.filter(id => id !== itemId));
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }

    try {
      setUpdatingIds([...updatingIds, itemId]);
      const updatedCart = await cartService.updateCartItem(itemId, newQuantity);
      setCartItems(updatedCart?.items || []);
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError("Failed to update quantity");
    } finally {
      setUpdatingIds(updatingIds.filter(id => id !== itemId));
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + (item.discountedPrice * item.quantity),
      0
    ).toFixed(2);
  };

  const calculateSavings = () => {
    return cartItems.reduce(
      (sum, item) => sum + ((item.price - item.discountedPrice) * item.quantity),
      0
    ).toFixed(2);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading your cart...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="cart-container">
        <div className="cart-header">
          <h1>🛒 Your Shopping Cart</h1>
          <p>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">📭</div>
            <h2>Your cart is empty</h2>
            <p>Start shopping to fill your cart with amazing T-shirts!</p>
            <button className="btn-primary" onClick={() => navigate("/")}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id || item.productId} className="cart-item">
                  <div className="item-image">
                    <img src={item.image || item.img} alt={item.name} />
                    {item.discount > 0 && (
                      <div className="discount-badge">
                        -{item.discount}%
                      </div>
                    )}
                  </div>

                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <div className="item-specs">
                      <span className="spec">Size: <strong>{item.size}</strong></span>
                      <span className="spec-divider">•</span>
                      <span className="spec">Color: <strong>{item.color}</strong></span>
                    </div>

                    <div className="item-pricing">
                      <span className="original-price">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="discounted-price">
                        ${item.discountedPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="item-quantity">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      disabled={updatingIds.includes(item._id)}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      readOnly
                      className="qty-input"
                    />
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      disabled={updatingIds.includes(item._id)}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total">
                    <p className="total-price">
                      ${(item.discountedPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    className="btn-remove"
                    onClick={() => removeItem(item._id)}
                    disabled={updatingIds.includes(item._id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
              </div>

              <div className="summary-row savings">
                <span>Total Savings</span>
                <span>−${calculateSavings()}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total">
                <span>Total Price</span>
                <span>${calculateTotal()}</span>
              </div>

              <button
                className="btn-checkout"
                onClick={() => navigate("/checkout")}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>

              <button
                className="btn-continue-shopping"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>

              <div className="shipping-info">
                <p>✓ Free shipping on orders above $50</p>
                <p>✓ 30-day returns</p>
                <p>✓ Secure checkout</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Cart;