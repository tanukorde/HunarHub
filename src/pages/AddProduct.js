import { useState } from "react";
import axios from "axios";

export default function AddProduct({ goBack }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

const entrepreneurId = user?.id;

if (!token || !entrepreneurId) {
  alert("Please login first");
  return;
}

  try {
    await axios.post(
  "http://localhost:5000/api/products",
  {
    name: formData.name,
    price: Number(formData.price),
    category: formData.category,
    description: formData.description,
    image: formData.image,
    entrepreneurId: entrepreneurId,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    alert("Product Added Successfully ✅");

    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
    });

  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Error ❌ Check backend");
  }
};

  return (
    <div style={container}>
      <form onSubmit={handleSubmit} style={form}>
        
        <h2 style={{ textAlign: "center", marginBottom: "5px" }}>
  ➕ Add Product
</h2>
<p style={{ textAlign: "center", fontSize: "13px", color: "#777" }}>
  Fill product details to list it
</p>

        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          style={input}
          required

          onFocus={(e) => {
    e.target.style.border = "1px solid #007bff";
  }}

  onBlur={(e) => {
    e.target.style.border = "1px solid #ddd";
  }}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          style={input}
          required
          onFocus={(e) => {
    e.target.style.border = "1px solid #007bff";
  }}

  onBlur={(e) => {
    e.target.style.border = "1px solid #ddd";
  }}
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          style={input}
          required
          onFocus={(e) => {
    e.target.style.border = "1px solid #007bff";
  }}

  onBlur={(e) => {
    e.target.style.border = "1px solid #ddd";
  }}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          style={input}
          onFocus={(e) => {
    e.target.style.border = "1px solid #007bff";
  }}

  onBlur={(e) => {
    e.target.style.border = "1px solid #ddd";
  }}
        />

        <textarea
          name="description"
          placeholder="Description"
          required
          value={formData.description}
          onChange={handleChange}
          style={textarea}
          onFocus={(e) => {
    e.target.style.border = "1px solid #007bff";
  }}

  onBlur={(e) => {
    e.target.style.border = "1px solid #ddd";
  }}
        />

        <button type="submit" style={btn}
         onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
  }}

  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
        >
          Add Product
        </button>

        <button type="button" onClick={goBack} style={backBtn}>
          ⬅ Back
        </button>
      </form>
    </div>
  );
}

/* styles */
const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f5f7fb",
  padding: "20px",
};

const form = {
  width: "100%",
  maxWidth: "420px",
  background: "white",
  padding: "22px",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const input = {
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "14px",
  transition: "0.3s",
};

const textarea = {
  padding: "10px",
  height: "90px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "14px",
  resize: "none",
};

const btn = {
  padding: "12px",
  background: "linear-gradient(135deg, #007bff, #0056d2)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
};

const backBtn = {
  padding: "10px",
  background: "#ff4d4d",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};