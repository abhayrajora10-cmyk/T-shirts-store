import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { orderService } from "../services/orderService";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!location.state?.order);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id || order) return;

      try {
        setLoading(true);
        const fetchedOrder = await orderService.getMyOrderById(id);
        setOrder(fetchedOrder);
      } catch (error) {
        console.error("Error loading order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, order]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="container">
          <p>Loading order details...</p>
        </main>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <main className="container">
          <h2>Order not found</h2>
          <button className="btn" onClick={() => navigate("/")}>Continue Shopping</button>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container" style={{ maxWidth: "800px", margin: "2rem auto" }}>
        <div className="card" style={{ padding: "1.5rem" }}>
          <h1>Order placed successfully</h1>
          <p>Your order has been confirmed.</p>

          <div style={{ marginTop: "1rem", lineHeight: 1.8 }}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Payment:</strong> {order.paymentMethod} ({order.paymentStatus})</p>
            <p><strong>Total:</strong> ${Number(order.finalPrice || 0).toFixed(2)}</p>
          </div>

          <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button className="btn" onClick={() => navigate("/")}>Continue Shopping</button>
            <button className="btn" onClick={() => navigate("/category")}>Browse More</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderSuccess;
