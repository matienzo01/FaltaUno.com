import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import Propuesta from "../../componentes/propuesta"

describe("Test relacionados al componente propuesta", () => {
	test("Creacion de nota correcta", () => {
		const horario = new Date().toISOString()
		const propuesta = {
			equipo: "Sacachispas",
			puesto: "Volante",
			lugar: "La bombonera",
			horario,
			descripcion: "Hola que tal"
		}
		const view = render(<Propuesta propuesta={propuesta} />)
	})
})