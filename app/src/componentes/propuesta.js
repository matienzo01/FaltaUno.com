import React from "react";

const Propuesta = ({ equipo, puesto, lugar, horario, descripcion }) => {
	return (
		<>
			<h1>{equipo} - {puesto}</h1>
			<h3>{lugar} - {horario}</h3>
			<p>Descripcion</p>
		</>
	)
}

export default Propuesta