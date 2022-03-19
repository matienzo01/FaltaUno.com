import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoginForm from '../components/loginForm';
import RegisterForm from '../components/registerForm';
import { setLoginInput, setRegisterInput } from '../redux/autorization/authActions';

export default function AuthPage() {

    const authStatus = useSelector(state => state.auth);
    const dispatch = useDispatch()
    console.log(authStatus);

    const toggleLogin = () => {
        dispatch(setLoginInput())
    }

    const toggleRegister = () => {
        dispatch(setRegisterInput())
    }

    const handleLogin = (event) => {
        event.preventDefault();

    }

    return (
        <div>
            {authStatus.input === "login" ? <LoginForm /> : <RegisterForm />}

            <button onClick={authStatus.token === undefined ? toggleRegister : toggleLogin} >Cambiar tipo</button>
        </div>

    )
}
