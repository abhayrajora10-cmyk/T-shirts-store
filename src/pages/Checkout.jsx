import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { cartService } from "../services/cartService";
import { orderService } from "../services/orderService";
import { authService } from "../services/authService";
import "../styles/checkout.css";

const initialAddress = {
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "India",
};

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  const [address, setAddress] = useState(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        setError("");

        if (!authService.isLoggedIn()) {
          navigate("/login", { replace: true, state: { from: "/checkout" } });
          return;
        }

        const cart = await cartService.getCart();
        const items = cart?.items || [];

        if (items.length === 0) {
          navigate("/cart", { replace: true });
          return;
        }

        setCartItems(items);
      } catch (err) {
        console.error("Error loading checkout cart:", err);

        if (err?.status === 401) {
          authService.logout();
          navigate("/login", { replace: true, state: { from: "/checkout" } });
          return;
        }

        setError("Failed to load checkout details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [navigate]);

  const pricing = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
      0
    );
    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.discountedPrice || 0) * Number(item.quantity || 0),
      0
    );

    return {
      subtotal,
      total,
      savings: subtotal - total,
    };
  }, [cartItems]);

  const handleAddressChange = (field, value) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateAddress = () => {
    if (!address.street.trim()) return "Street is required";
    if (!address.city.trim()) return "City is required";
    if (!address.state.trim()) return "State is required";
    if (!address.zipCode.trim()) return "ZIP/Postal code is required";
    if (!address.country.trim()) return "Country is required";
    return "";
  };

  const placeOrder = async () => {
    const validationError = validateAddress();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError("");
      setPlacingOrder(true);

      const order = await orderService.checkout({
        shippingAddress: address,
        paymentMethod,
        notes: notes.trim() || undefined,
      });

      navigate(`/order-success/${order._id}`, {
        replace: true,
        state: { order },
      });
    } catch (err) {
      console.error("Checkout error:", err);

      if (err?.status === 401) {
        authService.logout();
        navigate("/login", { replace: true, state: { from: "/checkout" } });
        return;
      }

      setError(err?.message || "Failed to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="checkout-container">
          <div className="checkout-loading">Loading checkout...</div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Review your order and complete shipping details.</p>
        </div>

        {error && <div className="checkout-alert">{error}</div>}

        <div className="checkout-layout">
          <section className="checkout-panel">
            <h2>Shipping Address</h2>

            <div className="checkout-grid">
              <label>
                Street Address
                <input
                  value={address.street}
                  onChange={(e) => handleAddressChange("street", e.target.value)}
                  placeholder="House no, street, landmark"
                />
              </label>

              <label>
                City
                <input
                  value={address.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  placeholder="City"
                />
              </label>

              <label>
                State
                <input
                  value={address.state}
                  onChange={(e) => handleAddressChange("state", e.target.value)}
                  placeholder="State"
                />
              </label>

              <label>
                ZIP / Postal Code
                <input
                  value={address.zipCode}
                  onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                  placeholder="Postal code"
                />
              </label>

              <label className="checkout-full">
                Country
                <input
                  value={address.country}
                  onChange={(e) => handleAddressChange("country", e.target.value)}
                  placeholder="Country"
                />
              </label>
            </div>

            <h2>Payment Method</h2>
            <div className="payment-options">
              {["cod", "upi", "credit-card", "debit-card", "net-banking"].map((method) => (
                <label key={method} className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>

            <h2>Order Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional: special delivery instructions"
              rows={4}
            />
          </section>

          <aside className="checkout-panel summary-panel">
            <h2>Order Review</h2>

            <div className="review-items">
              {cartItems.map((item) => (
                <div key={item._id || item.productId} className="review-item">
                  <img src={item.image || item.img} alt={item.name} />
                  <div>
                    <p className="review-name">{item.name}</p>
                    <p className="review-meta">
                      {item.size} | {item.color} | Qty: {item.quantity}
                    </p>
                  </div>
                  <strong>${(Number(item.discountedPrice || 0) * Number(item.quantity || 0)).toFixed(2)}</strong>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${pricing.subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row savings">
              <span>Savings</span>
              <span>-${pricing.savings.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${pricing.total.toFixed(2)}</span>
            </div>

            <button
              className="place-order-btn"
              onClick={placeOrder}
              disabled={placingOrder}
            >
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>

            <button
              className="back-btn"
              onClick={() => navigate("/cart")}
              disabled={placingOrder}
            >
              Back to Cart
            </button>
          </aside>
        </div>
      </main>
    </>
  );
}

export default Checkout;
