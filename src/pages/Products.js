import { useEffect, useState } from "react";
import axios from "axios";

export default function Products({
  goBack,
  selectedCategoryFromEntrepreneur,
}) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [cartCount, setCartCount] = useState(0);
const [wishlistCount, setWishlistCount] = useState(0);

  // CATEGORY FROM OUTSIDE
  useEffect(() => {
    setSelectedCategory(selectedCategoryFromEntrepreneur || "All");
  }, [selectedCategoryFromEntrepreneur]);


useEffect(() => {
  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

  setCartCount(cart.length);
  setWishlistCount(wishlist.length);

}, [products]);

  // FETCH PRODUCTS
  useEffect(() => {
  const token = localStorage.getItem("token");

  axios
    .get("http://localhost:5000/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
  console.log(res.data);

  setProducts(res.data.products || res.data);
})
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
}, []);

  // CATEGORIES
  const categories = [
    { name: "All", img: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg" },
    { name: "Tailor", img: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg" },
    { name: "Cobbler", img: "https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg" },
    { name: "Artisan", img: "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg" },
    { name: "Small Vendor", img: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg" },
    {name: "Potter",
  img: "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg"}
  ];

  // FILTER
  const filteredProducts = products.filter((p) => {
  const search = searchTerm.trim().toLowerCase();

  const matchCategory =
    selectedCategory === "All" ||
    (p.category || "").toLowerCase().trim() ===
      selectedCategory.toLowerCase().trim();

  const matchSearch =
    (p.name || "").toLowerCase().includes(search) ||
    (p.description || "").toLowerCase().includes(search);

  return matchCategory && matchSearch;
});

  // BUY FUNCTION
   const handleBuy = async (item) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    await axios.post(
      "http://localhost:5000/api/orders",
      {
        entrepreneurId: item.entrepreneurId,
        productId: item._id,
        productName: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        service: item.name,
        address: "Pune",
        date: new Date(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Order Placed Successfully ✅");

  } catch (err) {
    console.log("ORDER ERROR:", err.response?.data || err.message);

    alert(
      err.response?.data?.message ||
      "Order Failed ❌"
    );
  }
};


  const addToCart = (item) => {
  const existing = JSON.parse(localStorage.getItem("cart")) || [];

  const updated = [...existing, { ...item, qty: 1 }];

  localStorage.setItem("cart", JSON.stringify(updated));
  alert("Added to Cart🛒");
};
const addToWishlist = (item) => {
  const existing =
    JSON.parse(localStorage.getItem("wishlist")) || [];

  localStorage.setItem(
    "wishlist",
    JSON.stringify([...existing, item])
  );
  alert("Added to Whishlist❤️");
};

  // LOADING UI
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h3>Loading products... ⏳</h3>
      </div>
    );
  }

  // DETAILS PAGE
  if (selectedProduct) {
    return (
      <div style={detailsContainer}>
        <button style={backBtn} onClick={() => setSelectedProduct(null)}>
          ⬅ Back
        </button>

        <div style={detailsCard}>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            style={detailsImage}
          />

          <h2>{selectedProduct.name}</h2>
          <p>₹ {selectedProduct.price}</p>

          <p style={descBox}>{selectedProduct.description}</p>

          <button style={btn} onClick={() => handleBuy(selectedProduct)}>
            Buy Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={container}>
      <h2 style={{ textAlign: "center" }}>🛍 Products</h2>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
  🛒 Cart: {cartCount}
❤️ Wishlist: {wishlistCount}
</div>

      {/* SEARCH */}
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <input
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInput}
        />
      </div>

      {/* CATEGORY */}
      <div style={categoryContainer}>
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            style={{
              textAlign: "center",
              cursor: "pointer",
              transform:
                selectedCategory === cat.name ? "scale(1.1)" : "scale(1)",
              transition: "0.3s",
            }}
          >
            <img
              src={cat.img}
              alt={cat.name}
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "50%",
                objectFit: "cover",
                border:
                  selectedCategory === cat.name
                    ? "3px solid #007bff"
                    : "2px solid #ddd",
              }}
            />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

      {/* PRODUCTS */}
      {filteredProducts.length === 0 ? (
        <p style={{ textAlign: "center" }}>No Products Found 😕</p>
      ) : (
        <div style={grid}>
          {filteredProducts.map((item) => (
            <div
              key={item._id}
              style={card}
              onClick={() => setSelectedProduct(item)}
              onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-8px)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0px)";
    e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={imageStyle}
              />

              <h3>{item.name}</h3>
              <p>₹ {item.price}</p>

                <button
  style={cartBtnStyle}
  onClick={(e)=>{
    e.stopPropagation();
    addToCart(item);
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = "scale(1.03)";
    e.target.style.opacity = "0.9";
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.opacity = "1";
  }}
>
  Add to Cart 🛒
</button>

<button
  style={wishBtnStyle}
  onClick={(e)=>{
    e.stopPropagation();
    addToWishlist(item);
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = "scale(1.03)";
    e.target.style.opacity = "0.9";
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.opacity = "1";
  }}
>
  Wishlist ❤️
</button>

              <button
                style={btn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuy(item);
                }}
              >
                Buy Now
              </button>
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
  background: "#f5f7fb",
  minHeight: "100vh",
};

const categoryContainer = {
  display: "flex",
  gap: "18px",
  justifyContent: "center",
  flexWrap: "wrap",
  marginBottom: "25px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "25px",
};

const card = {
  width: "250px",
  background: "white",
  borderRadius: "12px",
  padding: "12px",
  textAlign: "center",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  cursor: "pointer",
};

const imageStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "10px",
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

const btn = {
  marginTop: "15px",
  padding: "12px",
  width: "100%",
  background: "linear-gradient(135deg, #667eea, #4f46e5)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const searchInput = {
  padding: "12px 18px",
  width: "320px",
  borderRadius: "25px",
  border: "1px solid #ddd",
};

const detailsContainer = {
  minHeight: "100vh",
  background: "#f5f7fb",
  padding: "20px",
};

const detailsCard = {
  maxWidth: "420px",
  margin: "40px auto",
  background: "white",
  padding: "30px",
  borderRadius: "18px",
  textAlign: "center",
  boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
};

const detailsImage = {
  width: "100%",
  height: "320px",
  objectFit: "cover",
  borderRadius: "14px",
};

const descBox = {
  marginTop: "10px",
  padding: "10px",
  background: "#f7f7f7",
  borderRadius: "10px",
  color: "#444",
};

const cartBtnStyle = {
  padding: "10px",
  marginTop: "10px",
  background: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
  transition: "0.2s ease",
  flex: 1,
};

const wishBtnStyle = {
  padding: "10px",
  marginTop: "10px",
  background: "#ff4d6d",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
  transition: "0.2s ease",
  flex: 1,
};