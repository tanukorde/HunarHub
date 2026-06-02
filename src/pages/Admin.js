import { useEffect, useState } from "react";

export default function Admin({ goBack }) {

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [orders, setOrders] = useState([]);

  // FETCH ALL DATA
  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchRequests();
    fetchOrders();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/admin/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchRequests = async () => {
    const res = await fetch("http://localhost:5000/api/admin/entrepreneur-requests");
    const data = await res.json();
    setRequests(data);
  };

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/api/admin/orders");
    const data = await res.json();
    setOrders(data);
  };

  // APPROVE ENTREPRENEUR
  const approveUser = async (id) => {
    await fetch(`http://localhost:5000/api/admin/approve/${id}`, {
      method: "PUT",
    });
    fetchRequests();
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/admin/product/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

    return (
  <div style={{ padding: "30px", background: "#f3f4f6", minHeight: "100vh" }}>

    <button onClick={goBack} style={btnBack}>
      ⬅ Back
    </button>

    <h1 style={{ marginBottom: "25px" }}>
      Admin Panel 🛠
    </h1>

    {/* TOP CARDS */}
    <div style={cardsContainer}>

      <div style={card}>
        <h3>Total Users</h3>
        <h1>{users.length}</h1>
      </div>

      <div style={card}>
        <h3>Total Products</h3>
        <h1>{products.length}</h1>
      </div>

      <div style={card}>
        <h3>Total Orders</h3>
        <h1>{orders.length}</h1>
      </div>

      <div style={card}>
        <h3>Entrepreneurs</h3>
        <h1>
          {
            users.filter(
              (u) => u.role === "entrepreneur"
            ).length
          }
        </h1>
      </div>

    </div>

    {/* USERS */}
    <h2 style={title}>Users Management 👥</h2>

    <div style={table}>
      {users.map((u) => (
        <div key={u._id} style={row}>

          <div>
            <h4>{u.name}</h4>
            <p>{u.email}</p>
          </div>

          <span
            style={{
              background:
                u.role === "admin"
                  ? "#dc2626"
                  : u.role === "entrepreneur"
                  ? "#2563eb"
                  : "#16a34a",

              color: "white",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            {u.role}
          </span>

        </div>
      ))}
    </div>

    {/* ENTREPRENEUR REQUESTS */}
    <h2 style={title}>
      Entrepreneur Requests 🧑‍💼
    </h2>

    <div style={table}>
      {requests.map((r) => (
        <div key={r._id} style={row}>

          <div>
            <h4>{r.name}</h4>
            <p>{r.email}</p>
          </div>

          <button
            onClick={() => approveUser(r._id)}
            style={btn}
          >
            Approve
          </button>

        </div>
      ))}
    </div>

    {/* PRODUCTS */}
    <h2 style={title}>Products Management 📦</h2>

    <div style={table}>
      {products.map((p) => (
        <div key={p._id} style={row}>

          <div>
            <h4>{p.name}</h4>
            <p>₹ {p.price}</p>
          </div>

          <button
            onClick={() => deleteProduct(p._id)}
            style={btnRed}
          >
            Delete
          </button>

        </div>
      ))}
    </div>

    {/* ORDERS */}
    <h2 style={title}>Orders Management 🛒</h2>

    <div style={table}>
      {orders.map((o) => (
        <div key={o._id} style={row}>

          <div>
            <h4>{o.productName}</h4>
            <p>{o.customerName}</p>
          </div>

          <span
            style={{
              color:
                o.status === "Delivered"
                  ? "green"
                  : "orange",

              fontWeight: "bold",
            }}
          >
            {o.status}
          </span>

        </div>
      ))}
    </div>

  </div>
);
}
const title = {
  marginTop: "30px",
  marginBottom: "15px",
};

const cardsContainer = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
  marginBottom: "30px",
};

const card = {
  background: "white",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
};

const table = {
  background: "white",
  padding: "15px",
  marginBottom: "20px",
  borderRadius: "12px",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px",
  borderBottom: "1px solid #eee",
};

const btn = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
};

const btnRed = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
};

const btnBack = {
  marginBottom: "20px",
  padding: "10px 15px",
  background: "#667eea",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};