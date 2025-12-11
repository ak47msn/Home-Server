import { Outlet, Link } from "react-router-dom"
import "@/styles/components/layout.scss"
import { useUser } from "../hooks/useUser";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Layout = () => {
    const { user, loading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [loading, user, navigate]);

    if (loading) return <p>Cargando…</p>;


    console.log(user);

    return (
        <div className="layout">
            <header className="layout-header">
                <div className="logo">{user?.firstName || "App"}</div>
                <nav className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    {user ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
                </nav>
            </header>

            <div className="layout-body">
                <aside className="layout-sidebar">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </aside>

                <main className="layout-main">
                    <Outlet />
                </main>
            </div>

            <footer className="layout-footer">
                Footer content
            </footer>
        </div>
    )
}

export default Layout
