import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"
import LandingPage from './componentes/pages/landingPage';
import { Provider } from 'react-redux'
import store from "./componentes/redux/store"

ReactDOM.render(
    <Provider store={store}>
        <header><h1>FaltaUno.com</h1> </header>
        <Router>
            <div>
                <Link to="/home" >Buscar partido</Link>
            </div>

            <Routes>
                <Route path="/home" element={<LandingPage />} />
            </Routes>

        </Router>
    </Provider>
    ,
    document.getElementById('root')
);
