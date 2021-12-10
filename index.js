function incializa() {
	fetch("http://localhost:8080/", {
		method: "POST",
		mode: "cors",
		body: "",
	})
		.then((response) => response.json())
		.then((respuesta) => {
			let id = 0;
			let propuestas = document.getElementById("cuerpo");
			let template = document.getElementById("template").content;
			respuesta.forEach((propuesta) => {
				let response = template.cloneNode(true);
				response
					.getElementById("propuesta")
					.setAttribute("id", `propuesta${id}`);

				response.getElementById(
					`EquipoPuesto`
				).innerHTML = `${propuesta.equipo} - ${propuesta.puesto}`;
				response
					.getElementById("EquipoPuesto")
					.setAttribute("id", `EquipoPuesto${id}`);

				response.getElementById(
					`LugarHorario`
				).innerHTML = `${propuesta.lugar} - ${propuesta.hora}`;
				response
					.getElementById("LugarHorario")
					.setAttribute("id", `LugarHorario${id}`);

				response.getElementById(
					`Descripcion`
				).innerHTML = `${propuesta.descripcion}`;
				response
					.getElementById("Descripcion")
					.setAttribute("id", `Descripcion${id}`);

				id++;
				propuestas.appendChild(response);
			});
		})
		.catch((err) => console.log(err));
}

incializa();
