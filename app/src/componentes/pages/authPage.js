import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/loginForm';
import RegisterForm from '../components/registerForm';

export default function AuthPage() {

    const [authStatus, setAuthStatus] = useState("login");

    const changeAuthStatus = () => {
        setAuthStatus(authStatus === "login" ? "register" : "login")
    }

    return (
        <div>
            {localStorage.getItem("token") !== null ? <Navigate to={"/"} /> : ""}
            {authStatus === "login" ?
                <>
                    <LoginForm />
                    <div>
                        <span onClick={changeAuthStatus}>No tenes una cuenta?? Registrate</span>
                    </div>
                </>
                :
                <>
                    <RegisterForm />
                    <div>
                        <span onClick={changeAuthStatus}>Ya tenes una cuenta?? Unite</span>
                    </div>
                </>
            }
        </div>

    )
}

/*

*/