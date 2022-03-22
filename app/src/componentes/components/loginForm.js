import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setUsername } from '../redux/autorization/authActions';

export default function LoginForm() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const changeUsername = (event) => {
        let username = event.target.value
        dispatch(setUsername({ username }))
    }

    const changePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = event => {
        event.preventDefault()
        const identificador = auth.username;
        axios.post("http://localhost:3001/api/login/", { identificador, contrasenia: password })
            .then(res => {
                let { token } = res.data;
                localStorage.setItem("token", token);
                navigate("/")
            })
    }

    return (
        <form>
            <div>Usuario</div>
            <input type='text' placeholder='ej: user1234' onChange={changeUsername} />
            <div>Contraseña</div>
            <input type='password' onChange={changePassword} />
            <div>
                <button onClick={handleLogin} >Login</button>
            </div>
        </form>
    )
}
