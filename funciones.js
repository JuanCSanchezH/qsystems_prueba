
/****************************** FUNCIONES *******************************/

// Función de envío de datos y ejecución de solicitud de Inicio
const Envio1 = () => {

    // Ejercicio 1
    arregloStr = document.getElementById('arreglo').value;
    let arreglo = arregloStr.split(',').map(function(item) { // Extracción del arreglo de enteros
        return parseInt(item, 10);
    });
    num = parseInt(document.getElementById('num').value);
    suma_num(arreglo, num);

    // Ejercicio 2
    palabra1 = document.getElementById('pal').value;
    palabra2 = document.getElementById('ana').value;
    anagrama(palabra1, palabra2);

    // Ejercicio 3
    arregloInv = document.getElementById('array').value;
    invert(arregloInv);

    // Ejercicio 4
    texto = document.getElementById('texto').value;
    analisisText(texto);
}

// Función de envío de datos y ejecución de solicitud de Login
const Envio2 = () => {

    // Ejercicio 5
    nombre = document.getElementById('name');
    correo = document.querySelector('#email');
    correo = correo.value;
    contraseña = document.querySelector('#contra');
    contraseña = contraseña.value.split("");
    val(nombre, correo, contraseña);
}

// EJERCICIO 1

function suma_num(arreglo, num) {
    let arregloSum = [];
    for (i = 0; i < arreglo.length; i++) {
        for (j = 0; j < arreglo.length; j++) {
            if(arreglo[i] !== arreglo[j]){
                arregloSum.push(arreglo[i]+arreglo[j]);// Sumas entre parejas de elementos del arreglo
            }
        }
    }
    var cercano = arregloSum.reduce(function(prev, actual) { // Búsqueda de la suma más cercana al número dado dentro del array de sumas
        return (Math.abs(actual - num) < Math.abs(prev - num) ? actual : prev);
    });

    for (i = 0; i < arreglo.length; i++) {
        for (j = 0; j < arreglo.length; j++) {
            if(arreglo[i] !== arreglo[j]){
                arregloSum.push(arreglo[i]+arreglo[j]);
            }
            if (arreglo[i] + arreglo[j] == cercano ) {
                if(arreglo[i] !== arreglo[j]) {
                    document.getElementById('numRes1').innerHTML = "Números cuya suma es más cecana a " + num + ": " + arreglo[i].toString() + " y " + arreglo[j].toString(); // Visualización de los números que coinciden con la suma más cercana
                }
            }
        }
    }
}


// EJERCICIO 2

function anagrama(palabra1, palabra2) {

    if(palabra1 && palabra2){

        // Eliminación de acentos, conversión a minúsculas, partición por "" y eliminación de espacios " " (filtrado). 
        // Se ordenan y finalmente se unen los caracteres por "" para poderse comparar
        if(palabra1.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase().split("")
        .filter(el => el != " ")
        .sort().join("") === palabra2.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase().split("")
        .filter(el => el != " ")
        .sort().join("")){
            document.getElementById('anaRes').innerHTML =  "¿Son anagramas? = True";
        }
        else document.getElementById('anaRes').innerHTML = "¿Son anagramas? = False";
    }
}

// EJERCICIO 3

function invert(arreglo){
    let nuevoArreglo = []
    arreglo = arreglo.split("").filter(el => el != " " && el != ","); //Partición y filtrado
    for(i = 0; i < arreglo.length; i++){
        nuevoArreglo[i] = arreglo[arreglo.length-i-1]; //Intercambio de posiciones
    }
    document.getElementById('inv').innerHTML = nuevoArreglo;
}

// EJERCICIO 4

function analisisText(texto){ 
    texto2 = texto.split(" ");
    document.getElementById('cantidad').innerHTML = `<p class="fw-bold">Cantidad: </p>` + texto2.length;
    document.getElementById('primera').innerHTML = `<p class="fw-bold">Primera palabra: </p>` + texto2[0];
    document.getElementById('ultima').innerHTML = `<p class="fw-bold">Última palabra: </p>` + texto2[texto2.length-1];
    document.getElementById('textInv').innerHTML = `<p class="fw-bold">Texto inverso: </p>` + texto.split("").reverse().join("");
}

// EJERCICIO 5

function val(nombre, correo, contraseña){ 
    var valNum = /\d/; // Formato numérico que debe contener la contraseña
    var valMay = /[A-Z]/; // Formato mayúscula que debe contener la contraseña
    var valEm = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/; // Formato válido para el correo
    if (contraseña.length >= 8){ // Evaluar si la contraseña contiene 8 o más caracteres
        if (valNum.test(contraseña)){ // Evaluar si la contraseña contiene un numero
            if (valMay.test(contraseña)){ // Evaluar si la contraseña contiene una mayúscula
                var pass = document.getElementById('contra').value;
                pass = pass.toUpperCase();
                encriptar(pass,1);
            }
            else {
                alert("Error: La contraseña debe contener al menos una letra mayúscula!");
                encriptar('',1);
            }
        }
        else {
            alert("Error: La contraseña debe contener al menos un número!");
            encriptar('',1);
        }
    }
    else{
        alert("Error: La contraseña debe contener al menos 8 caracteres!");
        encriptar('',1);
    }
    if (valEm.test(correo)){ //Evaluar si el correo tiene el formato válido
        /****/
    } else {
        alert("La dirección de email es incorrecta.");
        encriptar('',1);
    }
}

function encriptar(texto, desplazar){
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    abc = "ABCDEFGHIJKLEMNOPQRSTUVWXYZ0123456789" //Cadena base (abecedario y numeración)
    desplazar = (desplazar % 36 + 36) % 36; // Evitar que el desplazamiento llegue a ser superior a la longitud de la contraseña

    if(texto){
        for(let i = 0; i < texto.length; i++){
            if(abc.indexOf(texto[i]) != -1){ 
                // Si el elemento que está en la contraseña, se encuentra dentro de la cadena base, se genera
                // una nueva posición y se muestra la letra de la cadena base en esa nueva posición
                var nuevaPos = (abc.indexOf(texto[i])+desplazar)%36;
                resultado.innerHTML += abc[nuevaPos];
            }
        }
    }
}
