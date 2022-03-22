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

    const handleRegister = event => {
        event.preventDefault()
        const identificador = auth.username;
        axios.post("http://localhost:3001/api/users/", { identificador, contrasenia: password })
            .then(res => {
                if (res.status === 201) {
                    axios.post("http://localhost:3001/api/login/", { identificador, contrasenia: password })
                        .then(res => {
                            if (res.status === 200) {
                                let { token } = res.data;
                                localStorage.setItem("token", token);
                                navigate("/")
                            } else {
                                console.log("Fallo el login");
                            }
                        })
                } else {
                    console.log("Fallo el registro");
                }
            })
    }

    return (
        <form>
            <div>Usuario</div>
            <input type='text' placeholder='ej: user1234' onChange={changeUsername} />
            <div>Contraseña</div>
            <input type='password' onChange={changePassword} />
            <div>
                <button onClick={handleRegister} >Register</button>
            </div>
        </form>
    )
}
