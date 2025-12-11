import { useState } from "react";
import axios from "axios";
import "@/styles/pages/Login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("/api/users/login", {
                username,
                password,
            });
            localStorage.setItem("token", response.data.token);
            navigate("/");
            window.location.reload();
        } catch (err: any) {
            setError(err.response?.data?.message || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>
                <div className="form-group">
                    <label htmlFor="username">Nombre de Usuario</label>
                    <input
                        type="username"
                        id="username"
                        placeholder="Ingresa tu nombre de usuario"
                        required
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Ingresa tu contraseña"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="login-btn" disabled={loading}>
                    {loading ? "Cargando..." : "Sign In"}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    )
}

export default Login;