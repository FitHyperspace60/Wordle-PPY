const botonRefrescar = document.getElementById('reiniciar');
const diccionario = [
    'COCOS', 'PERRO', 'CIELO', 'MANGA', 'BOTON', 'TORTA',
    'CASCO', 'CIEGA', 'CESTA', 'ROBLE', 'LIBRO', 'PLUMA',
    'FUEGO', 'NIEVE', 'SOLAR', 'NARIZ', 'RATON', 'TIGRE',
    'PIANO', 'TEXTO', 'RUEDA', 'ZORRO', 'RAMPA', 'TORRE',
    'ARBOL', 'MAURO', 'HUEVO', 'MANZA', 'CAZAR', 'LLAVE'
];

let respuesta = diccionario[Math.floor(Math.random() * diccionario.length)];
let respuestaImprimir = respuesta;
respuesta = respuesta.split('');

console.log(respuestaImprimir);

var palabraIngresada = [];
var resultado = document.getElementById('resultado');
var letra_completada = [];

const palabras = document.querySelectorAll('.palabra');
var intentos = 0;
palabras[0].focus();
palabras.forEach((palabra) => {
    const letras = palabra.querySelectorAll('.letra');
    let indice = 0;
    
    palabra.addEventListener('keydown', function(event) {
        event.preventDefault();
        if ((/^[a-zA-Z]$/).test(event.key)) {
            if (indice < letras.length) {
                letras[indice].innerText = event.key.toUpperCase();
                letras[indice].classList.add('seleccionada'); 
                palabraIngresada.push(event.key.toUpperCase());
                indice++;
            }
        } else if (event.key == 'Backspace') {
            if (indice > 0) {
                indice--;
                letras[indice].innerText = '';
                letras[indice].classList.remove('seleccionada');
                palabraIngresada.pop();
            }
        } else if (event.key == 'Enter') {
            if (indice == 5) {
                intentos++;

                let correctos = 0;
                for (let i = 0; i < letras.length; i++) {
                    if (letras[i].innerText == respuesta[i]) {
                        letras[i].classList.remove('seleccionada');
                        letras[i].classList.add('correcto');
                        correctos++;
                        if (correctos == 5) {
                            resultado.classList.add('ganar');
                            resultado.innerHTML = "¡GANASTE!😀";
                            botonRefrescar.classList.add('activo');
                            botonRefrescar.focus();
                            return;
                        }
                    } else if (respuesta.includes(letras[i].innerText)) {
                        letras[i].classList.remove('seleccionada');
                        letras[i].classList.remove('ninguno');
                        letras[i].classList.add('parecido');
                    } else {
                        letras[i].classList.remove('seleccionada');
                        letras[i].classList.add('ninguno');
                    }
                }
                if (intentos > 5) {
                    resultado.classList.add('perder');
                    resultado.innerHTML = `¡PERDISTE!😖. RESPUESTA:${respuestaImprimir}`;
                    botonRefrescar.classList.add('activo');
                    botonRefrescar.focus();
                    return;
                }

                palabras[intentos - 1].setAttribute('contenteditable', 'false');
                palabras[intentos].setAttribute('contenteditable', 'true');
                palabras[intentos].focus();
            }
        }
    });
});

botonRefrescar.addEventListener('click', () => {
    location.reload();
});

function elementosComunes(array1, array2) {
    var elementosComunesArray = [];

    for (var i = 0; i < array1.length; i++) {
        if (array2.includes(array1[i]) && !elementosComunesArray.includes(array1[i])) {
            elementosComunesArray.push(array1[i]);
        }
    }

    return elementosComunesArray;
}
