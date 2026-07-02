import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
             setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        const res = await api.post("/auth/login", formData);

        login(res.data.user);
        navigate("/dashboard");
    } catch (err) {
        console.log("Backend Error:", err.response?.data);

        setError(
            err.response?.data?.message ||
            "Login failed"
        );
    } finally {
        setLoading(false);
    }
};
    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit}
                className="w-96 p-6 rounded">
                <h1 className="text-2xl mb-4"> Login</h1>
                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 w-full mb-3"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border p-2 w-full mb-3"
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 w-full"
                >

                    {loading ? "Logging in..." : "Login"}

                </button>
            </form>
        </div>
    );
};

export default Login;
