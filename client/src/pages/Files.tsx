import { useState, useEffect } from "react";
import axios from "axios";
import "@/styles/pages/Files.scss";

type FileType = {
    name: string;
    isDirectory: boolean;
    createdAt?: string;
    updatedAt?: string;
};

const Files = () => {
    const [currentPath, setCurrentPath] = useState("/");
    const [files, setFiles] = useState<FileType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<"all" | "file" | "folder">("all");
    const [sortOption, setSortOption] = useState<"nameAsc" | "nameDesc" | "created" | "modified">("nameAsc");
    const [recursive, setRecursive] = useState(false);
    const [foldersFirst, setFoldersFirst] = useState(true);
    const [showHidden, setShowHidden] = useState(false); // <-- checkbox nuevo
    const token = localStorage.getItem("token");

    const fetchFiles = async (path: string) => {
        setLoading(true);
        setError(null);
        try {
            const encodedPath = btoa(path);
            const res = await axios.get(`/api/dirs/read?directory=${encodedPath}&recursive=${recursive}`, {
                headers: { Authorization: token }
            });
            setFiles(res.data.files);
        } catch (err: any) {
            setError(err.message || "Error al leer archivos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles(currentPath);
    }, [currentPath, recursive]);

    const enterDirectory = (name: string) => {
        setCurrentPath(prev => `${prev}${prev.endsWith("/") ? "" : "/"}${name}`);
    };

    const goUp = () => {
        const parts = currentPath.split("/").filter(Boolean);
        parts.pop();
        setCurrentPath("/" + parts.join("/"));
    };

    const breadcrumbs = currentPath.split("/").filter(Boolean);

    // Filtrado y búsqueda
    let displayedFiles = files
        .filter(f => (filterType === "folder" ? f.isDirectory : filterType === "file" ? !f.isDirectory : true))
        .filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(f => showHidden || !f.name.startsWith(".")); // <-- filtrar ocultos

    // Ordenar carpetas primero si toggle activo
    if (foldersFirst) {
        displayedFiles = [...displayedFiles].sort((a, b) => {
            if (a.isDirectory && !b.isDirectory) return -1;
            if (!a.isDirectory && b.isDirectory) return 1;
            return 0;
        });
    }

    // Ordenamiento secundario
    displayedFiles = displayedFiles.sort((a, b) => {
        switch (sortOption) {
            case "nameAsc":
                return a.name.localeCompare(b.name);
            case "nameDesc":
                return b.name.localeCompare(a.name);
            case "created":
                return (a.createdAt ? new Date(a.createdAt).getTime() : 0) -
                    (b.createdAt ? new Date(b.createdAt).getTime() : 0);
            case "modified":
                return (a.updatedAt ? new Date(a.updatedAt).getTime() : 0) -
                    (b.updatedAt ? new Date(b.updatedAt).getTime() : 0);
            default:
                return 0;
        }
    });

    return (
        <div className="files-container">
            <h2>Explorador de Archivos</h2>

            <div className="breadcrumbs">
                <span onClick={() => setCurrentPath("/")}>/</span>
                {breadcrumbs.map((folder, idx) => {
                    const pathToFolder = "/" + breadcrumbs.slice(0, idx + 1).join("/");
                    return (
                        <span key={idx}>
                            / <span onClick={() => setCurrentPath(pathToFolder)}>{folder}</span>
                        </span>
                    );
                })}
            </div>

            <div className="search-filters">
                <input
                    type="text"
                    placeholder="Buscar archivos..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <select value={filterType} onChange={e => setFilterType(e.target.value as any)}>
                    <option value="all">Todos</option>
                    <option value="file">Archivos</option>
                    <option value="folder">Carpetas</option>
                </select>
                <select value={sortOption} onChange={e => setSortOption(e.target.value as any)}>
                    <option value="nameAsc">Nombre A-Z</option>
                    <option value="nameDesc">Nombre Z-A</option>
                    <option value="created">Fecha de creación</option>
                    <option value="modified">Fecha de modificación</option>
                </select>
                <label className="recursive-checkbox">
                    <input type="checkbox" checked={recursive} onChange={e => setRecursive(e.target.checked)} />
                    Buscar recursivamente
                </label>
                <label className="recursive-checkbox">
                    <input type="checkbox" checked={showHidden} onChange={e => setShowHidden(e.target.checked)} />
                    Mostrar archivos ocultos
                </label>
            </div>

            <div className="toggle-folders">
                <label>
                    <input type="checkbox" checked={foldersFirst} onChange={e => setFoldersFirst(e.target.checked)} />
                    Mostrar carpetas primero
                </label>
            </div>

            {loading && <p className="loading">Cargando...</p>}
            {error && <p className="error">{error}</p>}

            <ul className="file-list">
                {currentPath !== "/" && (
                    <li className="file-item folder" onClick={goUp}>
                        ..
                    </li>
                )}

                {displayedFiles.map(file => (
                    <li
                        key={file.name}
                        className={`file-item ${file.isDirectory ? "folder" : "file"} ${file.name.startsWith('.') ? "hidden-file" : ""}`}
                        onClick={() => file.isDirectory && enterDirectory(file.name)}
                    >
                        {file.isDirectory ? "📁" : "📄"} {file.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Files;
