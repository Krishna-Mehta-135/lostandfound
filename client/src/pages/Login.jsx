import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // for redirection

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:9898/api/v1/auth/login", formData);
      console.log("✅ Login success:", res.data);

      localStorage.setItem("token", res.data.data.token);

      setMessage("Login successful!");
      // Delay to show message then redirect
      setTimeout(() => {
        navigate("/"); // 👈 go to home page
      }, 1000);
    } catch (error) {
      console.error("❌ Login error:", error);
      if (error.response) {
        setMessage(error.response.data.message || "Invalid credentials");
      } else {
        setMessage("Network error. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a2a3a]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-sm shadow-xl w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center text-[#1a2a3a]">Welcome Back</h2>

        {message && (
          <p className={`text-center ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}
