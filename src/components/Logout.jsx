import { useNavigate } from "react-router-dom";

export default function Logout({setToken}) {

    const navigate = useNavigate();

    const logoutHandler = () => {
        setToken("");
        localStorage.clear();
        navigate("/");
        location.reload()
    };

    return (
        <div className="confirm">
            <button onClick={() => logoutHandler()}>Logout</button>
        </div>
    );
}
