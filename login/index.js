function iniciaSesion() {
	const peticion = {};
	peticion.identificador = document.getElementById("identificador").value;
	peticion.password = document.getElementById("contrasenia").value;
	console.log(peticion);
	fetch("http://localhost:8080/login", {
		method: "POST",
		mode: "cors",
		body: JSON.stringify(peticion),
	});
}
