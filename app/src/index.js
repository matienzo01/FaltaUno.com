import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import AuthPage from "./componentes/pages/authPage";
import LandingPage from './componentes/pages/landingPage';
import Footer from './componentes/components/Footer';
import store from "./componentes/redux/store";

ReactDOM.render(
    <Provider store={store}>
        <header><h1>FaltaUno.com</h1> </header>
        <Router>
            <navBar>
                <ul>
                    <li><Link to="/" >Buscar partido</Link></li>
                    <li><Link to="/login">login</Link></li>

                </ul>
            </navBar >
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<AuthPage />} />
            </Routes>
        </Router>
        <Footer />
    </Provider>
    ,
    document.getElementById('root')
);
