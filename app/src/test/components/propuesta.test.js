import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Propuesta from "../../componentes/components/propuesta"

describe("Test relacionados al componente propuesta", () => {
	const horario = new Date().toISOString()
	const propuesta = {
		equipo: "Sacachispas",
		puesto: "Volante",
		lugar: "La bombonera",
		horario,
		descripcion: "Hola que tal"
	}

	test("Creacion de nota correcta", () => {
		render(<Propuesta equipo={propuesta.equipo} puesto={propuesta.puesto} lugar={propuesta.lugar} horario={propuesta.horario} descripcion={propuesta.descripcion} />)
		screen.getByText(`${propuesta.equipo} - ${propuesta.puesto}`)
		screen.getByText(`${propuesta.lugar} - ${propuesta.horario}`)
		screen.getByText(`${propuesta.descripcion}`)
	})
})