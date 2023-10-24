let set; 
let jugador1;
let jugador2;
let puntuacion1 = 0;
let puntuacion2 = 0;
let img1
let img2
let jugadores = "";

const empezar = () =>{
    switch(set){
        case 0:
            jugadores = ["IA", "IA_2"];
            console.log(set);
            ia_vs_ia();
        break;
        case 1:
            jugadores = ["Jugador 1", "IA"];
            console.log(set);
            jugador_vs_ia();
        break;
        case 2:
            jugadores = ["Jugador 1", "Jugador 2"];
            console.log(set);
            jugador1_vs_jugador2();
        break;
        default:
            alert("No se ha seleccionado la opción");
        break;
    }
} 

const set_0 = () =>{
    set = 0;

    img1 = document.getElementById("img1");
    console.log(img1);
    img1.src = "images/ia.png";

    img2 = document.getElementById("img2");
    console.log(img2);
    img2.src = "images/ia.png";

    jugador1 = document.getElementById("jugador1");
    jugador2 = document.getElementById("jugador2");

    jugador1.textContent = "IA";
    jugador2.textContent = "IA_2";
}

const set_1 = () =>{
    set = 1;

    img1 = document.getElementById("img1");
    console.log(img1);
    img1.src = "images/jugador1.png";

    img2 = document.getElementById("img2");
    console.log(img2);
    img2.src = "images/ia.png";

    jugador1 = document.getElementById("jugador1");
    jugador2 = document.getElementById("jugador2");

    jugador1.textContent = "Jugador 1";
    jugador2.textContent = "IA";
}

const set_2 = () =>{
    set = 2;

    img1 = document.getElementById("img1");
    console.log(img1);
    img1.src = "images/jugador1.png";

    img2 = document.getElementById("img2");
    console.log(img2);
    img2.src = "images/jugador2.png";

    jugador1 = document.getElementById("jugador1");
    jugador2 = document.getElementById("jugador2");

    jugador1.textContent = "Jugador 1";
    jugador2.textContent = "Jugador 2";
}

const ia_vs_ia = () =>{
    const numeroAleatorio = Math.floor(Math.random() * 3) + 1;
    console.log(numeroAleatorio);

    switch(numeroAleatorio){
        case 1:
            img1.src = "images/piedra.png";
        break;
        case 2:
            img1.src = "images/papel.png";
        break;
        case 3:
            img1.src = "images/tijera.png";
        break;
    }

    const numeroAleatorio2 = Math.floor(Math.random() * 3) + 1;
    console.log(numeroAleatorio2);

    switch(numeroAleatorio2){
        case 1:
            img2.src = "images/piedra.png";
        break;
        case 2:
            img2.src = "images/papel.png";
        break;
        case 3:
            img2.src = "images/tijera.png";
        break;
    }
    procesarResultado(numeroAleatorio, numeroAleatorio2);

}   

const jugador_vs_ia = () =>{
    const respuesta = prompt("1-Piedra\n2-Papel\n3-Tijera");

    switch(respuesta){
        case '1':
            img1.src = "images/piedra.png";
        break;
        case '2':
            img1.src = "images/papel.png";
        break;
        case '3':
            img1.src = "images/tijera.png";
        break;
    }

    const numeroAleatorio = Math.floor(Math.random() * 3) + 1;

    switch(numeroAleatorio){
        case 1:
            img2.src = "images/piedra.png";
        break;
        case 2:
            img2.src = "images/papel.png";
        break;
        case 3:
            img2.src = "images/tijera.png";
        break;
    }

    procesarResultado(respuesta, numeroAleatorio);
}

const jugador1_vs_jugador2 = () =>{
    const respuesta = prompt("Jugador 1\n1-Piedra\n2-Papel\n3-Tijera");
    const respuesta2 = prompt("Jugador 2\n1-Piedra\n2-Papel\n3-Tijera");

    switch(respuesta){
        case '1':
            img1.src = "images/piedra.png";
        break;
        case '2':
            img1.src = "images/papel.png";
        break;
        case '3':
            img1.src = "images/tijera.png";
        break;
    }

    switch(respuesta2){
        case '1':
            img2.src = "images/piedra.png";
        break;
        case '2':
            img2.src = "images/papel.png";
        break;
        case '3':
            img2.src = "images/tijera.png";
        break;
    }

    procesarResultado(respuesta, respuesta2);
}

const procesarResultado = (opcion1, opcion2) =>{
    if(opcion1 == opcion2){
        console.log("EMPATE");
    }else if(opcion1 == 1 && opcion2 == 2){
        puntuacion2 ++;
    }else if(opcion1 == 1 && opcion2 == 3){
        puntuacion1 ++;
    }else if(opcion1 == 2 && opcion2 == 1){
        puntuacion1 ++;
    }else if(opcion1 == 2 && opcion2 == 3){
        puntuacion2 ++;
    }else if(opcion1 == 3 && opcion2 == 1){
        puntuacion2 ++;
    }else if(opcion1 == 3 && opcion2 == 2){
        puntuacion1 ++;
    }
    
    const total1 = document.getElementById("puntuacion1");
    const total2 = document.getElementById("puntuacion2");

    total1.textContent = puntuacion1;
    total2.textContent = puntuacion2;
}

const finalizar = () =>{

    if (puntuacion1 > puntuacion2) {
        alert(`Ha ganado ${jugadores[0]}`);
    } else if (puntuacion1 < puntuacion2) {
        alert(`Ha ganado ${jugadores[1]}`);
    } else {
        alert("Empate");
    }

    puntuacion1 = 0;
    puntuacion2 = 0;

    const total1 = document.getElementById("puntuacion1");
    const total2 = document.getElementById("puntuacion2");

    total1.textContent = puntuacion1;
    total2.textContent = puntuacion2;

    img1.src = "images/default.png";
    img2.src = "images/default.png";

    set = 3;
} 