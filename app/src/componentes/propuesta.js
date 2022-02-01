import React from "react";
import PropTypes from "prop-types"

const Propuesta = ({ equipo, puesto, lugar, horario, descripcion }) => { //{ equipo, puesto, lugar, horario, descripcion }
	return (
		<>
			<h1>{equipo} - {puesto}</h1>
			<h3>{lugar} - {horario}</h3>
			<p>{descripcion}</p>
		</>
	)
}

Propuesta.propTypes = {
	equipo: PropTypes.string.isRequired,
	puesto: PropTypes.string.isRequired,
	lugar: PropTypes.string.isRequired,
	horario: PropTypes.string.isRequired,
	descripcion: PropTypes.string
}

export default Propuesta