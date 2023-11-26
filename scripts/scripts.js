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