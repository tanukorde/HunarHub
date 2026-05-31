import { useEffect, useState } from "react";
import axios from "axios";

export default function MyOrders({ goBack }) {
  const [orders, setOrders] = useState([]);

 
  // 📥 FETCH ORDERS
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

      return (

    <div style={container}>
      <h2 style={{ textAlign: "center", marginBottom:"30px" }}>🧾 My Orders</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No Orders Found ❌</p>
      ) : (
        <div style={grid}>
          {orders.map((item) => (
            <div key={item._id} style={card}

            onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.12)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0px)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
  }}
            >

              {/* 📷 IMAGE */}
              <img
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.productName}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              />

              {/* 🏷️ DETAILS */}
              <h3>{item.productName}</h3>
              <p style={{margin:"3px 0"}}>₹ {item.price}</p>
              <p style={{ color: "#555" }}>
                Category: {item.category}
              </p>

              {/* 📌 STATUS */}
              <p
                style={{
                  fontWeight: "bold",
                  color:
                    item.status === "pending"
                      ? "orange"
                      : item.status === "accepted"
                      ? "blue"
                      : item.status === "rejected"
                      ? "red"
                      : "green",
                }}
              >
                {item.status}
              </p>

            </div>
          ))}
        </div>
      )}

      {/* ⬅ BACK BUTTON */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={goBack} style={backBtn}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  padding: "20px",
  minHeight: "100vh",
  background: "#f5f7fb",
};

const grid = {
  display: "flex",
 flexwrap:"wrap",
  gap: "18px",
  justifycontent: "center",
};

const card = {
  width: "300px",
  background: "white",
  borderRadius: "12px",
  padding: "14px",   
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.8)",
  transition: "all 0.3s ease",

  display: "flex",
  flexDirection: "column",
  gap: "4px",        
};


const imageStyle = {
  width: "100px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom:"6px",
};

const backBtn = {
  padding: "10px 15px",
  background: "black",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

