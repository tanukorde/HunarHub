import { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      }
    );

    console.log("LOGIN RESPONSE:", res.data);

    // ✅ CLEAR OLD DATA FIRST (GOOD PRACTICE)
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    // ✅ SAVE NEW DATA
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("role", res.data.user.role);

    alert("Login Successful ✅");

    setTimeout(() => {
      onLogin();
    }, 300);

  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message || "Login Failed ❌"
    );
  }
};
  
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
  "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "white",
          padding: "40px",
         borderRadius: "20px",
          width: "350px",
          textAlign: "center",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          }}
         >

       <>
  <h2 style={{
    marginBottom: "10px",
    fontSize: "32px",
  }}>
    HunarHub Login
  </h2>

  <p style={{
    color: "gray",
    marginBottom: "25px",
  }}>
    Support Local Entrepreneurs 🌟
  </p>
</>

         <input
  type="email"
  required
  placeholder="Enter Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  style={{
    width: "100%",
    padding: "14px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "15px",
    outline: "none",
  }}
/>
  
        <input
  type="password"
  required
  placeholder="Enter Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
          style={{
  width: "100%",
  padding: "14px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "15px",
  outline: "none",
}}
        />

        <button
          type="submit"
          style={{
  width: "100%",
  padding: "14px",
  background: "#667eea",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
  transition: "0.3s",
}}
        >
          Login
        </button>

      </form>
    </div>
  );
}