import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from 'axios';
import AuthPage from "./componentes/pages/authPage";
import LandingPage from './componentes/pages/landingPage';
import Footer from './componentes/components/Footer';
import store from "./componentes/redux/store";
import Layout from './componentes/components/Layout';
import PropusePage from './componentes/pages/propousPage';

axios.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    req.headers.Authorization = `Bearer ${token}`;
    return req
})

ReactDOM.render(
    <Provider store={store}>
        <header><h1>FaltaUno.com</h1> </header>
        <Router>
            <Layout />
            <Routes>
                <Route path="/" element={<LandingPage />} >
                </Route>
                <Route path='/propuesta/:id' element={<PropusePage />} />
                <Route path="/auth" element={<AuthPage />} />
            </Routes>
        </Router>
        <Footer />
    </Provider >
    ,
    document.getElementById('root')
);

