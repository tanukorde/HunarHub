import { useState } from "react";

export default function Cart({ goBack }) {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // REMOVE ITEM
  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // UPDATE QTY
  const updateQty = (id, type) => {
    const updated = cartItems.map((item) => {
      if (item._id === id) {
        const currentQty = item.qty || 1;

        return {
          ...item,
          qty:
            type === "inc"
              ? currentQty + 1
              : currentQty > 1
              ? currentQty - 1
              : 1,
        };
      }
      return item;
    });

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // TOTAL PRICE
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  return (
    <div style={container}>

      {/* HEADER (LEFT BACK + CENTER TITLE) */}
      <div style={header}>

        {/* LEFT */}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <button style={backBtn} onClick={goBack}>
            ⬅ Back
          </button>
        </div>

        {/* CENTER */}
        <h2 style={{ margin: 0, textAlign: "center" }}>
          🛒 My Cart
        </h2>

        {/* RIGHT EMPTY */}
        <div />
      </div>

      {/* EMPTY CART */}
      {cartItems.length === 0 ? (
        <div style={empty}>
          <h3>🛒 Your cart is empty</h3>
          <p>Add some products to continue shopping</p>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} style={card}>
              <img src={item.image} style={img} />

              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>₹ {item.price}</p>

                {/* QTY */}
                <div style={qtyBox}>
                  <button
                    style={qtyBtn}
                    onClick={() => updateQty(item._id, "dec")}
                  >
                    -
                  </button>

                  <span style={{ fontWeight: "bold" }}>
                    {item.qty || 1}
                  </span>

                  <button
                    style={qtyBtn}
                    onClick={() => updateQty(item._id, "inc")}
                  >
                    +
                  </button>
                </div>

                <button
                  style={removeBtn}
                  onClick={() => removeItem(item._id)}
                >
                  Remove ❌
                </button>
              </div>
            </div>
          ))}

          {/* TOTAL */}
          <div style={totalBox}>
            Total: ₹ {total}
          </div>
        </>
      )}

    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  minHeight: "100vh",
  background: "#f5f7fb",
  padding: "20px",
};

const header = {
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  alignItems: "center",
  maxWidth: "650px",
  margin: "0 auto 20px auto",
};

const empty = {
  textAlign: "center",
  marginTop: "50px",
};

const card = {
  width: "100%",
  maxWidth: "650px",
  display: "flex",
  gap: "20px",
  padding: "20px",
  borderRadius: "15px",
  background: "white",
  margin: "20px auto",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  alignItems: "center",
};

const img = {
  width: "100px",
  height: "100px",
  borderRadius: "12px",
  objectFit: "cover",
};

const qtyBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "10px",
};

const qtyBtn = {
  width: "30px",
  height: "30px",
  border: "none",
  borderRadius: "6px",
  background: "#4f46e5",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
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

const totalBox = {
  maxWidth: "650px",
  margin: "20px auto",
  padding: "15px",
  background: "white",
  borderRadius: "10px",
  textAlign: "right",
  fontWeight: "bold",
  fontSize: "18px",
};