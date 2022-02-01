function creaPropuesta() {
	let params = {};
	params.equipo = document.getElementById("nombreEquipoInput").value;
	params.puesto = document.getElementById("posicionInput").value;
	params.dia = document.getElementById("diaInput").value;
	params.lugar = document.getElementById("lugarInput").value;
	params.descripcion = document.getElementById("descripcionInput").value;
	params.precio = document.getElementById("precioInput").value;

	fetch("http://localhost:8080/api/crearPropuesta", {
		method: "POST",
		mode: "cors",
		body: JSON.stringify(params),
		headers: { "Access-Control-Allow-Credentials": true },
	}).then(console.log("Propuesta creada con exito"));
}
