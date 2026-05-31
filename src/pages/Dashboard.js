import { useState, useEffect } from "react";
import Products from "./Products";
import BrowseEntrepreneurs from "./BrowseEntrepreneurs";
import MyOrders from "../components/MyOrders";
import AddProduct from "./AddProduct";
import EntrepreneursOrders from "./EntrepreneursOrders";
import Admin from "./Admin";
import EntrepreneurRequests from "./EntrepreneurRequests";
import Cart from "./Cart";
import Wishlist from "./Wishlist";

import {
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaMoneyBill,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Dashboard({ setIsLoggedIn }) {

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const [page, setPage] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    entrepreneurs: 0,
    earnings: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/dashboard/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 CLEAN PAGE RENDERER (MAIN FIX)
  const renderPage = () => {
    if (page === "products") {
      return (
        <Products
          goBack={() => setPage("home")}
          selectedCategoryFromEntrepreneur={selectedCategory}
        />
      );
    }

    if (page === "entrepreneurs") {
      return (
        <BrowseEntrepreneurs
          goBack={() => setPage("home")}
          openProducts={(category) => {
            setSelectedCategory(category);
            setPage("products");
          }}
        />
      );
    }

    if (page === "orders")
      return <MyOrders goBack={() => setPage("home")} />;

    if (page === "cart")
      return <Cart goBack={() => setPage("home")} />;

    if (page === "wishlist")
      return <Wishlist goBack={() => setPage("home")} />;

    if (page === "addproduct")
      return <AddProduct goBack={() => setPage("home")} user={user} />;

    if (page === "admin")
      return <Admin goBack={() => setPage("home")} />;

    if (page === "EntrepreneurRequests")
      return <EntrepreneurRequests goBack={() => setPage("home")} />;

    if (page === "entrepreneurOrders")
      return <EntrepreneursOrders goBack={() => setPage("home")} />;

    return null;
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6" }}>

      {/* SIDEBAR */}
      <div style={{ width: "260px", background: "#0f172a", color: "white", padding: "25px" }}>

        <h1 style={{ marginBottom: "35px", fontSize: "42px", fontWeight: "bold" }}>
          HunarHub
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

          <button style={btn} onClick={() => setPage("home")}>Dashboard</button>

          {role === "user" && (
            <>
              <button style={btn} onClick={() => { setSelectedCategory("All"); setPage("products"); }}>
                View Products
              </button>

              <button style={btn} onClick={() => setPage("entrepreneurs")}>
                View Entrepreneurs
              </button>

              <button style={btn} onClick={() => setPage("orders")}>
                My Orders
              </button>

              <button style={btn} onClick={() => setPage("cart")}>
                Cart 🛒
              </button>

              <button style={btn} onClick={() => setPage("wishlist")}>
                Wishlist ❤️
              </button>
            </>
          )}

          {role === "entrepreneur" && (
            <>
              <button style={btn} onClick={() => { setSelectedCategory("All"); setPage("products"); }}>
                View Products
              </button>

              <button style={btn} onClick={() => setPage("entrepreneurs")}>
                View Entrepreneurs
              </button>

              <button style={btn} onClick={() => setPage("EntrepreneurRequests")}>
                Service Requests
              </button>

              <button style={btn} onClick={() => setPage("entrepreneurOrders")}>
                Manage Orders
              </button>

              <button style={btn} onClick={() => setPage("addproduct")}>
                ➕ Add Product
              </button>
            </>
          )}

          {role === "admin" && (
            <button style={btn} onClick={() => setPage("admin")}>
              Admin Panel
            </button>
          )}

        </div>

        {/* LOGOUT */}
        <button
          style={{ ...btn, background: "#dc2626", marginTop: "30px" }}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setIsLoggedIn(false);
          }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "35px" }}>

        {page === "home" ? (
          <>
            <h1 style={{ fontSize: "52px", marginBottom: "10px" }}>
              Welcome to HunarHub 👋
            </h1>

            <p style={{ color: "gray", marginBottom: "35px", fontSize: "18px" }}>
              Support Local Entrepreneurs & Handmade Products
            </p>

            {/* STATS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))", gap: "25px" }}>

              {[
                { title: "Products", value: stats.products, icon: <FaBox size={30} />, color: "#7c3aed" },
                { title: "Orders", value: stats.orders, icon: <FaShoppingCart size={30} />, color: "#16a34a" },
                { title: "Entrepreneurs", value: stats.entrepreneurs, icon: <FaUsers size={30} />, color: "#2563eb" },
                { title: "Earnings", value: `₹${stats.earnings}`, icon: <FaMoneyBill size={30} />, color: "#ea580c" },
              ].map((card, index) => (
                <div key={index} style={cardStyle}>
                  <div style={{ background: card.color, width: "70px", height: "70px", borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", marginBottom: "20px" }}>
                    {card.icon}
                  </div>
                  <h2>{card.title}</h2>
                  <h1 style={{ fontSize: "42px" }}>{card.value}</h1>
                </div>
              ))}

            </div>
          </>
        ) : (
          renderPage()
        )}

      </div>
    </div>
  );
}

const btn = {
  padding: "15px 18px",
  background: "#667eea",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "20px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
};