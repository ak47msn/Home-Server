import { useState, useEffect } from "react";
import axios from "axios";
import "@/styles/pages/ShortUrl.scss";

type ShortUrlType = {
    _id: string;
    original: string;
    shorted: string;
    owner: string;
};

const ShortUrl = () => {
    const [urls, setUrls] = useState<ShortUrlType[]>([]);
    const [newUrl, setNewUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem("token") || "";

    const fetchUrls = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get("/api/shorturl/list", {
                headers: { Authorization: token }
            });
            setUrls(res.data.urls || []);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Error cargando URLs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUrls();
    }, []);

    const handleAdd = async () => {
        if (!newUrl.trim()) return;
        try {
            await axios.post("/api/shorturl/create", { url: newUrl }, { headers: { Authorization: token } });
            setNewUrl("");
            fetchUrls();
        } catch (err: any) {
            alert(err.response?.data?.message || err.message || "Error creando URL");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Eliminar esta URL acortada?")) return;
        try {
            await axios.delete(`/api/shorturl/delete/${id}`, { headers: { Authorization: token } });
            fetchUrls();
        } catch (err: any) {
            alert(err.response?.data?.message || err.message || "Error eliminando URL");
        }
    };

    const handleCopy = (shorted: string) => {
        navigator.clipboard.writeText(`http://localhost:3001/api/shorturl/${shorted}`).then(() => alert("URL copiada al portapapeles"));
    };

    return (
        <div className="shorturl-container">
            <h2>Gestor de URLs acortadas</h2>

            <div className="add-url">
                <input
                    type="text"
                    placeholder="Pega la URL original aquí..."
                    value={newUrl}
                    onChange={e => setNewUrl(e.target.value)}
                />
                <button onClick={handleAdd}>Acortar</button>
            </div>

            {loading && <p className="loading">Cargando...</p>}
            {error && <p className="error">{error}</p>}

            <ul className="url-list">
                {urls.map(url => (
                    <li key={url._id} className="url-item">
                        <div className="url-original">{url.original}</div>
                        <div className="url-actions">
                            <button onClick={() => window.open(`http://localhost:3001/api/shorturl/${url.shorted}`, "_blank")}>Abrir</button>
                            <button onClick={() => handleCopy(url.shorted)}>Copiar</button>
                            <button className="danger" onClick={() => handleDelete(url._id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShortUrl;
