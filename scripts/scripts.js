function modificarColorFondo(){
    var colorSeleccionado = document.getElementById("colorFondo").value;
    document.querySelector(".contenedor").style.backgroundColor = colorSeleccionado;
}

function modificarTamañoFuente(){
    var tamañoLetra = document.getElementById("tamañoLetra").value;
    document.querySelector(".itemEstilo").style.fontSize = tamañoLetra+"px";
}

function modificarColorLetra(){
    var colorSeleccionado = document.getElementById("colorLetra").value;
    document.querySelector(".itemEstilo").style.color = colorSeleccionado;
}

function modificarColorLaterales(){
    var colorSeleccionado = document.getElementById("colorLaterales").value;
    document.querySelector(".leftMargin").style.backgroundColor = colorSeleccionado;
    document.querySelector(".rightMargin").style.backgroundColor = colorSeleccionado;
}

function modificarFuente(){
    var fuente = document.getElementById("fuenteLetra").value;
    document.querySelector(".itemEstilo").style.fontFamiliy = fuente;
}

window.addEventListener("load", function () {
  desplegarDatos();
  activarOrdenacion();
});

const datos = [
  ["15/10/2023", "Calle Universidad 7", "Fallo eléctrico", "50 hrs", "50"],
  ["20/10/2023", "Avenida Principal 12", "Reparación de electrodomésticos", "30 hrs", "80"],
  ["25/10/2023", "Calle del Comercio 5", "Instalación eléctrica", "40 hrs", "120"],
  ["02/11/2022", "Plaza Mayor 8", "Fontanería", "25 hrs", "60"],
  ["10/11/2023", "Paseo de la Reforma 15", "Pintura interior", "35 hrs", "90"],
  ["18/11/2023", "Calle del Sol 3", "Reparación de calderas", "45 hrs", "150"],
  ["23/11/2023", "Avenida Libertad 21", "Cambio de cerraduras", "20 hrs", "40"],
  ["01/12/2023", "Ronda de la Luna 17", "Instalación de cámaras de seguridad", "55 hrs", "200"],
  ["08/12/2023", "Calle de la Esperanza 10", "Carpintería", "28 hrs", "70"],
  ["15/12/2023", "Avenida del Parque 25", "Limpieza de canalones", "15 hrs", "30"]
];

let estadoTabla = {
  columnasMostradas: [0, 1, 2, 3, 4],
  ordenAscendente: true,
  columnaOrdenada: 0,
  datosMostrados: datos.slice()
};

function desplegarDatos() {
  const tabla = document.getElementById("tablaSiniestros");
  const cuerpoTabla = tabla.getElementsByTagName("tbody")[0];

  cuerpoTabla.innerHTML = "";

  estadoTabla.datosMostrados.forEach(dato => {
    const fila = cuerpoTabla.insertRow();
    dato.forEach((valor, index) => {
      if (estadoTabla.columnasMostradas.includes(index)) {
        const celda = fila.insertCell();
        const textoCelda = document.createTextNode(valor);
        celda.appendChild(textoCelda);
      }
    });
  });
}

function comparador(a, b, columna) {
  const valorA = a[columna];
  const valorB = b[columna];

  if (columna == 4) {
    return estadoTabla.ordenAscendente ? valorA - valorB : valorB - valorA;
  } else if (columna == 0) {
    const fechaSplitA = valorA.split('/').reverse().join('/');
    const fechaSplitB = valorB.split('/').reverse().join('/');
    const fechaA = new Date(fechaSplitA);
    const fechaB = new Date(fechaSplitB);
    return estadoTabla.ordenAscendente ? fechaA - fechaB : fechaB - fechaA;
  } else if (typeof valorA === "string" && typeof valorB === "string") {
    return estadoTabla.ordenAscendente ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
  } else {
    return 0;
  }
}

function ordenarTabla(columna) {
  estadoTabla.datosMostrados.sort((a, b) => comparador(a, b, columna));
  estadoTabla.ordenAscendente = !estadoTabla.ordenAscendente;
  estadoTabla.columnaOrdenada = columna;

  desplegarDatos();
}

function activarOrdenacion() {
  const encabezados = document.getElementsByTagName("th");

  for (let i = 0; i < encabezados.length; i++) {
    encabezados[i].addEventListener("click", function () {
      ordenarTabla(i);
    });
  }
}

$(document).ready(function () {
  $(".seccionOcultar input[type='checkbox']").on("change", function () {
    const columnIndex = parseInt($(this).attr("id").replace("checkbox", ""));
    toggleColumn(columnIndex, this);
  });

  function toggleColumn(columnIndex, button) {
    const index = estadoTabla.columnasMostradas.indexOf(columnIndex);
    if (index !== -1) {
      estadoTabla.columnasMostradas.splice(index, 1);
      $(button).removeClass("mostrar");
    } else {
      estadoTabla.columnasMostradas.push(columnIndex);
      $(button).addClass("mostrar");
    }

    $("#tablaSiniestros tr").each(function () {
      $(this).find("td:eq(" + columnIndex + "), th:eq(" + columnIndex + ")").toggle();
    });

    desplegarDatos();
  }
});
