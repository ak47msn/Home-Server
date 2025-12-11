import "@/styles/pages/Home.scss";
import { useUser } from "../hooks/useUser";

const Home = () => {

    const { user } = useUser();

    
    const cards = [
        {
            title: "Archivos",
            description: "Gestiona y sube tus archivos fácilmente.",
            icon: "📁",
            gradient: "linear-gradient(135deg, #667eea, #764ba2)"
        },
        {
            title: "URL Shorter",
            description: "Acorta tus enlaces y hazlos fáciles de compartir.",
            icon: "🔗",
            gradient: "linear-gradient(135deg, #00b894, #00cec9)"
        },
        {
            title: "IA",
            description: "Interactúa con inteligencia artificial para automatizar tareas.",
            icon: "🤖",
            gradient: "linear-gradient(135deg, #ff6b6b, #ff9f43)"
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
                        <button className="card-button">Ir a {card.title}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
