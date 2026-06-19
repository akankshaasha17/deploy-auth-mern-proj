import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("https://deploy-auth-mern-proj-api.vercel.app/products", {
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setProducts(data.products);
      } else {
        navigate("/login");
      }
    });

}, [navigate]); // ✅ FIX

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome 🎉</h1>

      <button
        onClick={handleLogout}
       style={{ width: "auto", padding: "10px 20px" }}
>       Logout
       </button>

      <h2>Products</h2>

      {products.map((p, i) => (
        <div key={i}>
          {p.name} - ₹{p.price}
        </div>
      ))}
    </div>
  );
}
