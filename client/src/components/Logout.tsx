import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigate  = useNavigate();
    useEffect(() => {
        localStorage.removeItem("token");
        navigate("/login")
    }, []);

    return <>Logging Out</>
}

export default Logout;