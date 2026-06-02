import { useEffect, useState } from "react";
import axios from "axios";

export default function EntrepreneurRequests({ goBack }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    if (!token) {
      console.log("No token found");
      return;
    }

    axios
      .get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("ORDERS RESPONSE:", res.data);
        setRequests(res.data || []);
      })
      .catch((err) => {
        console.log("FETCH ERROR:", err.response?.data || err.message);
      });
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status } : r
        )
      );
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const getStatusColor = (status) => {
    if (status === "accepted") return "green";
    if (status === "rejected") return "red";
    if (status === "delivered") return "blue";
    return "orange";
  };

  const getStatusBg = (status) => {
    if (status === "accepted") return "#e6f7e6";
    if (status === "rejected") return "#ffe6e6";
    if (status === "delivered") return "#e6f0ff";
    return "#fff4e6";
  };

  return (
    <div style={container}>
      <h2 style={title}>Service Request</h2>
      {requests.length === 0 ? (
        <p style={{ textAlign: "center" }}>No Requests Found</p>
      ) : (
        <div style={grid}>
          {requests.map((item) => (
            <div key={item._id} style={card}>
              <p>👤 Name: {item.userId?.name}</p>
              <p>📧 Email: {item.userId?.email}</p>
              <p>🏢 Entrepreneur: Local entrepreneurs</p>
              <p>🛠 Service: {item.service}</p>
              <p>📍 Address: {item.address}</p>

              <p>
                📅 Date:{" "}
                {item.date
                  ? new Date(item.date).toLocaleDateString()
                  : "N/A"}
              </p>

              <p>
                📌 Status:{" "}
                <span
                  style={{
                    color: getStatusColor(item.status),
                    background: getStatusBg(item.status),
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    display: "inline-block",
                  }}
                >
                  {item.status}
                </span>
              </p>

              <button
                style={btn}
                disabled={item.status !== "pending"}
                onClick={() => updateStatus(item._id, "accepted")}
                title={item.status !== "pending" ? "Already processed" : ""}
              >
                Accept
              </button>

              <button
                style={btnRed}
                disabled={item.status !== "pending"}
                onClick={() => updateStatus(item._id, "rejected")}
                title={item.status !== "pending" ? "Already processed" : ""}
              >
                Reject
              </button>

              <button
                style={btnGreen}
                disabled={item.status !== "accepted"}
                onClick={() => updateStatus(item._id, "delivered")}
              >
                Delivered
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
  minHeight: "100vh",
  background: "#f5f7fb",
};

const grid = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
};

const card = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  width: "350px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const btn = {
  margin: "5px",
  padding: "8px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const btnRed = {
  margin: "5px",
  padding: "8px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const btnGreen = {
  margin: "5px",
  padding: "8px",
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const backBtn = {
  padding: "10px 15px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
const title = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "28px",
  fontWeight: "bold",
  color: "#333",
};