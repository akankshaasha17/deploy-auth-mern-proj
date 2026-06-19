import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      return toast.error("All fields are required");
    }

    try {
      const res = await fetch("https://deploy-auth-mern-proj-api.vercel.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const d = await res.json();

      if (d.success && d.token) {
        localStorage.setItem("token", d.token);

        toast.success("Login successful 🎉");

        setTimeout(() => {
          navigate("/home");
        }, 800);
      } else {
        toast.error(d.message);
      }

    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={e => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={e => setData({ ...data, password: e.target.value })}
        />

        <button type="submit">Login</button>
      </form>

      <p>
        New user? <Link to="/">Signup</Link>
      </p>

      <ToastContainer />
    </div>
  );
}
