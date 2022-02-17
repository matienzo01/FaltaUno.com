import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,  Route, Link, Routes} from "react-router-dom"
import LandingPage from './componentes/pages/landingPage';


ReactDOM.render(
	<React.StrictMode>
        <Router>
            <div>
                <Link to="/home" >Buscar partido</Link>
                
            </div>          

            <Routes>
                <Route path="/home" element={<LandingPage/>}/>
            </Routes>
                
            
        
        </Router>
	</React.StrictMode>,
	document.getElementById('root')
);
