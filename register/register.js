function register() {
	const peticion = {};
	peticion.identificador = document.getElementById("identificador").value;
	peticion.contrasenia = document.getElementById("contrasenia").value;
	fetch("http://localhost:8080/api/register", {
		method: "POST",
		mode: "cors",
		body: JSON.stringify(peticion),
	});
}
