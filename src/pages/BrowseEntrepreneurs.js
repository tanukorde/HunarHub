export default function Entrepreneurs({
  goBack,
  openProducts,
}) {
  const entrepreneurs = [
    {
      id:1,
      name: "Ganesh Potter",
       category: "Potter",
      location: "Nashik",
      rating: 4.6,
      experience: "5 years",
      availability: "Available",
      image:
         "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg",

        description:
        "Traditional clay pots, diyas and handmade mud crafts.",
    },

    {
      id: 2,
      name: "Ramesh Tailor",
      category: "Tailor",
      location: "Pune",
      rating:4.8,
      experience:"6years",
      availability:"Available",
      image:
      "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg",
      description:
        "Expert in blouse stitching and custom tailoring services.",
    },

    {
      id: 3,
      name: "Suresh Cobbler",
      category: "Cobbler",
      location: "Mumbai",
      rating:4.5,
      experience:"5years",
      availability:"Available",
      image:
        "https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg",
      description:
        "Professional shoe repair and leather fixing services.",
    },

    {
      id: 4,
      name: "Anita Artisan",
      category: "Artisan",
      location: "Nashik",
      rating:4.1,
      experience:"4years",
      availability:"Available",
      image:
        "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg",
      description:
        "Handmade clay pots and traditional decorative crafts.",
    },

    {
      id: 5,
      name: "Priya Vendor",
      category: "Small Vendor",
      location: "Aurangabad",
      rating:3.5,
      experience:"4years",
      availability:"Available",
      image:
        "https://images.pexels.com/photos/5945737/pexels-photo-5945737.jpeg",
      description:
        "Homemade snacks, pickles, papad and spice products.",
    },
  ];

  return (
    <div style={container}>
      
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
  👨‍💼 Local Entrepreneurs
</h2>

      <div style={grid}>
        {entrepreneurs.map((item) => (
          <div key={item.id} style={card}
          onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
    e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0px) scale(1)";
    e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={imageStyle}
            />

            <h3>{item.name}</h3>

            <p style={categoryText}>
  {item.category}
</p>

<p style={{ margin: "2px 0" }}>📍 {item.location}</p>

            <p style={desc}>
  {item.description.length > 70
    ? item.description.slice(0, 70) + "..."
    : item.description}
</p>

<p style={infoText}>⭐ {item.rating} Rating</p>

<p style={infoText}>
  👨‍💼 {item.experience}
</p>

<p style={availableText}>
  🟢 {item.availability}
</p>

            <button
  style={btn}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
  onClick={() => openProducts(item.category)}
  >
  View Products
</button>


 <button
  style={serviceBtn}
  onClick={() =>
    alert(
      `Service booked with ${item.name} ✅`
    )
  }
>
  Book Service
</button>

          </div>
        ))}
      </div>

     
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={goBack} style={backBtn}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
}

const container = {
  padding: "20px",
  background: "#f5f7fb",
  minHeight: "100vh",
};

const grid = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
};

const card = {
  width: "260px",
  background: "white",
  borderRadius: "14px",
  padding: "16px",
  textAlign: "center",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",

  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const imageStyle = {
  width: "100%",
  height: "160px",
  objectFit: "cover",
  borderRadius: "12px",
};

const categoryText = {
  color: "#007bff",
  fontWeight: "bold",
  background: "#eaf2ff",
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
};

const desc = {
  fontSize: "14px",
  color: "#555",
};

const btn = {
  marginTop: "6px",
  padding: "8px",
  width: "100%",
  fontSize: "14px",
  background: "linear-gradient(135deg, #007bff, #0056d2)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
};

const backBtn = {
  padding: "10px 15px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const serviceBtn = {
  marginTop: "8px",
  padding: "10px",
  width: "100%",
  background: "linear-gradient(135deg, #28a745, #1e7e34)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};
const infoText = {
  margin: "2px 0",
  fontSize: "13px",
  color: "#444",
};

const availableText = {
  margin: "2px 0",
  fontSize: "13px",
  color: "green",
  fontWeight: "bold",
};