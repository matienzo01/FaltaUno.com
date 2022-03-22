import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUsername } from "../redux/autorization/authActions";

const Layout = () => {
    const navigate = useNavigate();
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch()

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
        dispatch(setUsername({ username: "" }))
    }

    return (<>
        {authState.username !== "" && localStorage.getItem("token") !== null ? <h2>Welcome {authState.username}</h2> : ""}
        <ul>
            <li><Link to="/" >Buscar partido</Link></li>
            <li><Link to="/auth">Login/Register</Link></li>
        </ul>
        <button onClick={logout}>Logout</button>
    </>
    )
}

export default Layout