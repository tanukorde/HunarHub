import { useState } from "react";
import axios from "axios";

export default function Register({ goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
  alert("Password must be at least 6 characters");
  return;
}

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      alert("Signup Successful ✅");

      goToLogin();

    } catch (err) {

  console.log(
    "REGISTER ERROR:",
    err.response?.data || err.message
  );

  alert(
    err.response?.data?.message ||
    "Signup Failed ❌"
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
        onSubmit={handleRegister}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "350px",
          textAlign: "center",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        }}
      >

        <select value={role} onChange={(e) => setRole(e.target.value)}>
  <option value="user">User</option>
  <option value="entrepreneur">Entrepreneur</option>
</select>

        <h2
          style={{
            marginBottom: "10px",
            fontSize: "32px",
          }}
        >
          HunarHub Signup
        </h2>

        <p
          style={{
            color: "gray",
            marginBottom: "25px",
          }}
        >
          Join Local Entrepreneurs 🌟
        </p>

        <input
          type="text"
          required
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          required
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          required
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
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
          }}
        >
          Signup
        </button>

        <p style={{ marginTop: "15px" }}>
          Already have account?
        </p>

        <button
          type="button"
          onClick={goToLogin}
          style={{
            background: "none",
            border: "none",
            color: "#667eea",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "15px",
  outline: "none",
};