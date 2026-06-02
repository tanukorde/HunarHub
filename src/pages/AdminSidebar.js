export default function AdminSidebar() {

  return (

    <div style={sidebar}>

      <h2 style={{ marginBottom: "30px" }}>
        Admin Panel
      </h2>

      <button style={btn}>Dashboard</button>

      <button style={btn}>Products</button>

      <button style={btn}>Orders</button>

      <button style={btn}>Entrepreneurs</button>

      <button style={btn}>Analytics</button>

      <button style={logoutBtn}>Logout</button>

    </div>
  );
}

const sidebar = {
  width: "220px",
  minHeight: "100vh",
  background: "#111827",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  
};

const btn = {
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "#374151",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const logoutBtn = {
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "red",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};