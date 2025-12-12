import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

import "@/styles/components/layout.scss"

const Layout = () => {
    const { user, loading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [loading, user, navigate]);

    if (loading) return <p>Cargando…</p>;

    return (
        <div className="layout">
            <header className="layout-header">
                <div className="logo">{user?.firstName || "App"}</div>
                <nav className="nav">
                    <Link to="/" className="nav-link">
                        🏠 Home
                    </Link>
                    <Link to="/about" className="nav-link">
                        ℹ️ About
                    </Link>
                    <Link to="/files" className="nav-link">
                        📁 Files
                    </Link>
                    <Link to="/shorturl" className="nav-link">
                        🔗 Short URLs
                    </Link>
                    {user ? (
                        <Link to="/logout" className="nav-link logout">
                            🚪 Logout
                        </Link>
                    ) : (
                        <Link to="/login" className="nav-link login">
                            🔑 Login
                        </Link>
                    )}
                </nav>

            </header>

            <div className="layout-body">
                <aside className="layout-sidebar">
                    <ul>
                        <li>
                            <Link to="/">
                                🏠 Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about">
                                ℹ️ About
                            </Link>
                        </li>
                        <li>
                            <Link to="/files">
                                📁 Files
                            </Link>
                        </li>
                        <li>
                            <Link to="/shorturl">
                                🔗 Short URLs
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings">
                                ⚙️ Settings
                            </Link>
                        </li>
                    </ul>
                </aside>

                <main className="layout-main">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout;
