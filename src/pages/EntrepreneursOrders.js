import { useEffect, useState } from "react";
import axios from "axios";

export default function EntrepreneursOrders({ goBack }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status } : o
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={container}>
      <h2 style={title}>📦 Entrepreneur Orders</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders yet received</p>
      ) : (
        <div style={grid}>
          {orders.map((item) => (
            <div key={item._id} style={card}>
              
              <img src={item.image} style={imageStyle} />

              <h3>{item.productName}</h3>
              <p>₹ {item.price}</p>

              {/* STATUS BADGE */}
              <span style={statusBadge(item.status)}>
                {item.status}
              </span>

              {/* BUTTONS */}
             <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
  
  <button
    style={{ ...btn, background: "#007bff", color: "white" }}
    disabled={item.status !== "pending"}
    onClick={() => updateStatus(item._id, "accepted")}
  >
    Accept
  </button>

  <button
    style={{ ...btn, background: "#dc3545", color: "white" }}
    disabled={item.status !== "pending"}
    onClick={() => updateStatus(item._id, "rejected")}
  >
    Reject
  </button>

  <button
    style={{ ...btn, background: "#28a745", color: "white" }}
    disabled={item.status !== "accepted"}
    onClick={() => updateStatus(item._id, "delivered")}
  >
    Delivered
  </button>

</div>

              
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={goBack} style={backBtn}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  padding: "20px",
  minHeight: "100vh",
  background: "#f5f7fb",
};

const title = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "22px",
  fontWeight: "bold",
};

const grid = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
};

const card = {
  width: "320px",
  background: "white",
  borderRadius: "12px",
  padding: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const imageStyle = {
  width: "100px",
  height: "140px",
  objectFit: "cover",
  borderRadius: "10px",
};

const statusBadge = (status) => ({
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold",
  display: "inline-block",
  background:
    status === "pending"
      ? "#fff3cd"
      : status === "accepted"
      ? "#cce5ff"
      : status === "rejected"
      ? "#f8d7da"
      : "#d4edda",
  color:
    status === "pending"
      ? "#856404"
      : status === "accepted"
      ? "#004085"
      : status === "rejected"
      ? "#721c24"
      : "#155724",
});

const btn = {
  padding: "6px 10px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  margin: "4px",
  fontSize: "13px",
};

const backBtn = {
  padding: "10px 16px",
  background: "linear-gradient(135deg, #ff4d4d, #d90000)",
  color: "white",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
};