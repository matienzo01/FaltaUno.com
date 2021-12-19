function cambiaPagina(pagina) {
	console.log(pagina);
	window.location.replace(`http://localhost:8080/${pagina}`);
}

//TODO implementar recuperacion de valores para mostrar
function rellenaHuecos() {
	let busqueda = window.location.search;
	fetch("http://localhost:8080/api/filter" + busqueda, {
		method: "GET",
		mode: "cors",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			data = data[0];
			document.getElementById(
				"EquipoPuesto"
			).innerHTML = `${data.equipo} - ${data.puesto}`;
			document.getElementById(
				"LugarHorario"
			).innerHTML = `${data.lugar} - ${data.dia}`;
			document.getElementById("Descripcion").innerHTML = data.descripcion;
		});
}

rellenaHuecos();
