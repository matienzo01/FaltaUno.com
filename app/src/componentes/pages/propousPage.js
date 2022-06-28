import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'

export default function PropusePage() {

    const [propuesta, setPropuesta] = useState({});
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3001/api/propuestas/${id}`).then(res => {
            if (res.status === 200) {
                let { data } = res;
                setPropuesta(data);
            } else {
                console.log("No existe una propuesta con ese id");
            }
        })
    }, []);

    const handleSuscription = () => {
        //TODO implementar postularse a una propuesta
    }

    return (
        <>
            <div>
                <h1>{propuesta.equipo} - {propuesta.puesto}</h1>
                <h3>{propuesta.lugar} - {propuesta.dia}</h3>
                {propuesta.descripcion ? <p>{propuesta.descripcion}</p> : ""}
            </div>
            <aside>
                <p>${propuesta.precio}</p>
                <button onClick={handleSuscription}>Postularme</button>
            </aside>
        </>
    )
}
