function incializa() {
	fetch("http://localhost:8080/api/filter", {
		method: "GET",
		mode: "cors",
	})
		.then((response) => response.json())
		.then((respuesta) => {
			let id = 0;
			let propuestas = document.getElementById("cuerpo");
			let template = document.getElementById("template").content;
			respuesta.forEach((propuesta) => {
				creaPropuesta(id, propuesta, template, propuestas);
				id++;
			});
		})
		.catch((err) => console.log(err));
}

function aplicaFiltro() {
	let params = {};
	params.filtro = document.getElementById("filtro").value;
	params.tipo = document.getElementById("lugarInput").checked
		? "lugarInput"
		: "posicionInput";
	let urlParam = new URLSearchParams(params);
	console.log(urlParam.toString());

	document.getElementById("cuerpo").innerHTML = "";

	fetch("http://localhost:8080/api/filter?" + urlParam.toString(), {
		method: "GET",
		mode: "cors",
	})
		.then((response) => response.json())
		.then((data) => {
			let id = 0;
			let propuestas = document.getElementById("cuerpo");
			let template = document.getElementById("template").content;
			data.forEach((propuesta) => {
				creaPropuesta(id, propuesta, template, propuestas);
				id++;
			});
		});
}

function creaPropuesta(id, propuesta, template, destino) {
	let response = template.cloneNode(true);
	response.getElementById("propuesta").setAttribute("id", `propuesta${id}`);

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

	destino.appendChild(response);
}

function cambiaPagina(pagina) {
	//TODO cambiar de paginaa traves de js
}

incializa();
