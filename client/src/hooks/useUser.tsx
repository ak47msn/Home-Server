import { useEffect, useState } from "react";
import axios from "axios";

interface User {
    createdAt: string,
    email: string,
    firstName: string,
    lastName: string,
    isAdmin: boolean,
    permissions: Array<string>,
    settings: Object,
    updatedAt: string,
    username: string,
    baseDir: string,
    __v: Number,
    _id: string
}


let initialToken = localStorage.getItem("token");

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        const fetchUser = async () => {
            if (!initialToken) {
                setLoading(false);
                return;
            }
            try {
                const res = await axios.get<User>("/api/users/me", {
                    headers: { Authorization: initialToken }
                });
                setUser(res.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    return { user, setUser, logout, loading };
};