import "@/styles/pages/Home.scss";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    const cards = [
        {
            title: "Archivos",
            description: "Gestiona y sube tus archivos fácilmente.",
            icon: "📁",
            gradient: "linear-gradient(135deg, #667eea, #764ba2)",
            href: "/files"
        },
        {
            title: "URL Shorter",
            description: "Acorta tus enlaces y hazlos fáciles de compartir.",
            icon: "🔗",
            gradient: "linear-gradient(135deg, #00b894, #00cec9)",
            href: "/url"
        },
        {
            title: "IA",
            description: "Interactúa con inteligencia artificial para automatizar tareas.",
            icon: "🤖",
            gradient: "linear-gradient(135deg, #ff6b6b, #ff9f43)",
            href: "/ia"
        },
        {
            title: "Chat Interno",
            description: "Comunícate con otros usuarios dentro de tu red privada.",
            icon: "💬",
            gradient: "linear-gradient(135deg, #6c5ce7, #00b894)",
            href: "/chat"
        },
        {
            title: "Gestor de Descargas",
            description: "Controla tus descargas y archivos de forma centralizada.",
            icon: "📥",
            gradient: "linear-gradient(135deg, #fd79a8, #e84393)",
            href: "/downloads"
        },
        {
            title: "Panel de Dispositivos",
            description: "Monitorea y controla tus dispositivos conectados.",
            icon: "📡",
            gradient: "linear-gradient(135deg, #00cec9, #0984e3)",
            href: "/devices"
        },
        {
            title: "Notas Rápidas",
            description: "Escribe recordatorios o listas de tareas rápidas.",
            icon: "📝",
            gradient: "linear-gradient(135deg, #ffeaa7, #fab1a0)",
            href: "/notes"
        },
        {
            title: "Dashboard de Red",
            description: "Visualiza estadísticas de tu red local en tiempo real.",
            icon: "📊",
            gradient: "linear-gradient(135deg, #a29bfe, #6c5ce7)",
            href: "/network"
        },
        {
            title: "Reproductor Multimedia",
            description: "Reproduce música y videos almacenados en tu servidor.",
            icon: "🎵",
            gradient: "linear-gradient(135deg, #ff9f43, #ff6b6b)",
            href: "/player"
        }
    ];

    return (
        <div className="home-container">
            <h1>Bienvenido {user?.firstName}</h1>
            <p>Explora las herramientas disponibles:</p>

            <div className="cards-container">
                {cards.map((card) => (
                    <div
                        key={card.title}
                        className="card"
                        style={{ background: card.gradient }}
                    >
                        <div className="card-icon">{card.icon}</div>
                        <h2 className="card-title">{card.title}</h2>
                        <p className="card-description">{card.description}</p>
                        <button className="card-button" onClick={() => {
                            navigate(card.href)
                        }}>Ir a {card.title}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
