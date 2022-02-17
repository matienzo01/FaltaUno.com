import React, { useEffect, useState } from "react";
import axios from "axios"
import Propuesta from "../components/propuesta";

const LandingPage = () => {

    const [propuestas, setPropuestas] = useState([])
    
    useEffect(() => {
        axios.get("http://localhost:3001/api/propuestas/")
            .then((response) => {
                setPropuestas(response.data);
            })
    }, [])

	return (
        <div>
            {propuestas.map( propuesta => <Propuesta key={propuesta.id} equipo={propuesta.equipo} puesto={propuesta.puesto} lugar={propuesta.lugar} horario={propuesta.dia} /> )}

        </div>
	)
}

export default LandingPage