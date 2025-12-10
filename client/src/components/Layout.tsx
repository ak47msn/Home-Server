import { Outlet, Link } from "react-router-dom"
import "@/styles/components/layout.scss"
import { useEffect } from "react"
import axios from "axios";

const Layout = () => {
    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("/api/users/me")
    }, []);

    return (
        <div className="layout">
            <header className="layout-header">
                <div className="logo">Mi App</div>
                <nav className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/logout">Logout</Link>
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
