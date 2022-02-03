function incializa() {
    sessionStorage.clear();
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
    let key = document.getElementById("lugarInput").checked
        ? "lugar"
        : "puesto";
    let value = document.getElementById("filtro").value;
    params = JSON.parse(`{ "${key}": "${value}" }`);
    let urlParam = new URLSearchParams(params);
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
    ).innerHTML = `${propuesta.lugar} - ${propuesta.dia}`;
    response
        .getElementById("LugarHorario")
        .setAttribute("id", `LugarHorario${id}`);

    response.getElementById(
        `Descripcion`
    ).innerHTML = `${propuesta.descripcion}`;
    response
        .getElementById("Descripcion")
        .setAttribute("id", `Descripcion${id}`);

    response
        .getElementById("bottonDetalles")
        .setAttribute("id", `bottonDetalles${id}`);
    destino.appendChild(response);
}

function verPropuesta(id) {
    let equipoPuesto = document.getElementById(`EquipoPuesto${id}`).innerHTML;
    equipoPuesto = equipoPuesto.split(" - ");
    console.log(id);
    let equipo = equipoPuesto[0];
    let puesto = equipoPuesto[1];

    let lugarHorario = document.getElementById(`LugarHorario${id}`).innerHTML;
    lugarHorario = lugarHorario.split(" - ");
    let lugar = lugarHorario[0];
    let dia = lugarHorario[1];

    let descripcion = document.getElementById(`Descripcion${id}`).innerHTML;
    let propuestaObjeto = { equipo, puesto, lugar, dia, descripcion };
    let propuestaURL = new URLSearchParams(propuestaObjeto);

    cambiaPagina("propuesta?" + propuestaURL.toString());
}

incializa();
