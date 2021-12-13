function creaPropuesta() {
	let params = {};
	params.equipo = document.getElementById("nombreEquipoInput").value;
	params.puesto = document.getElementById("posicionInput").value;
	params.dia = document.getElementById("diaInput").value;
	//FIXME ver que onda como se puede formatear lo de la hora
	params.lugar = document.getElementById("lugarInput").value;
	params.descripcion = document.getElementById("descripcionInput").value;
	params.precio = document.getElementById("precioInput").value;
	console.log(params);

	fetch("http://localhost:8080/api/crearPropuesta", {
		method: "POST",
		mode: "cors",
		body: params,
	})
		.then((respose) => respose.json())
		.then(console.log("Propuesta creada con exito"));
}

function cambiaPagina(pagina) {
	console.log(pagina);
	window.location.replace(`http://localhost:8080/${pagina}`);
}
