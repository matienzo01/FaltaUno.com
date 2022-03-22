import React from "react";
import PropTypes from "prop-types"

const Propuesta = ({ equipo, puesto, lugar, horario, descripcion, id }) => { //{ equipo, puesto, lugar, horario, descripcion }

    const showPropuesta = () => {
        console.log(id);
    }

    return (
        <>
            <h1>{equipo} - {puesto}</h1>
            <h3>{lugar} - {horario}</h3>
            {descripcion ? <p>{descripcion}</p> : ""}
            <button onClick={showPropuesta} >Show details</button>
        </>
    )
}

Propuesta.propTypes = {
    equipo: PropTypes.string.isRequired,
    puesto: PropTypes.string.isRequired,
    lugar: PropTypes.string.isRequired,
    horario: PropTypes.string.isRequired,
    descripcion: PropTypes.string,
    id: PropTypes.string.isRequired
}

export default Propuesta