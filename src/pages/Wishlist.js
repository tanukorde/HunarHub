import { useState } from "react";

export default function Wishlist({ goBack }) {
  const [wishlistItems, setWishlistItems] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  // REMOVE ITEM
  const removeItem = (id) => {
    const updated = wishlistItems.filter((item) => item._id !== id);
    setWishlistItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div style={page}>

      {/* HEADER */}
      <div style={header}>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <button style={backBtn} onClick={goBack}>
            ⬅ Back
          </button>
        </div>

        <h2 style={{ margin: 0, textAlign: "center" }}>
          ❤️ My Wishlist
        </h2>

        <div />
      </div>

      {/* CONTENT */}
      <div style={content}>

        {wishlistItems.length === 0 ? (
          <div style={empty}>
            <h3>❤️ Your wishlist is empty</h3>
            <p>Save products you like here</p>
          </div>
        ) : (
          wishlistItems.map((item) => (
            <div key={item._id} style={card}>
              <img src={item.image} style={img} />

              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>₹ {item.price}</p>

                <button
                  style={removeBtn}
                  onClick={() => removeItem(item._id)}
                >
                  Remove ❌
                </button>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  background: "#f5f7fb",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "20px",
};

const content = {
  width: "90%",       
  maxWidth: "900px",  
};

const header = {
  width: "100%",
  maxWidth: "650px",
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  alignItems: "center",
  marginBottom: "10px",
};

const card = {
  width: "100%",
  display: "flex",
  gap: "20px",
  padding: "20px",
  borderRadius: "15px",
  background: "white",
  margin: "12px 0",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  alignItems: "center",
};

const empty = {
  textAlign: "center",
  marginTop: "40px",
};



const img = {
  width: "100px",
  height: "100px",
  objectFit: "cover",
  borderRadius: "10px",
};

const removeBtn = {
  marginTop: "10px",
  background: "#ff3b3b",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
};

const backBtn = {
  padding: "10px 15px",
  background: "#ff3b3b",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};