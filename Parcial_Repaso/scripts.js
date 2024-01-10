function jugar(){
    jugadores = document.getElementById("jugadores");
    partidas = document.getElementById("partidas");
    var numJugadores = jugadores.value;
    var numPartidas = partidas.value;
    if(numJugadores == "Jugadores" || numPartidas == "Partidas"){
        alert("Numero de jugadores o partidas incorrecto");
    }else{
        jugador1 = document.getElementById("jugador1");
        jugador2 = document.getElementById("jugador2");
        jugador3 = document.getElementById("jugador3");
        
        jugador1.style.display = "block";
        jugador2.style.display = "block";
        jugador3.style.display = "block";

        document.getElementById("puntuaciones").style.display = "block";
        
        if(numJugadores == "1"){
            document.getElementById("inputJugador2").disabled = true;
            document.getElementById("inputJugador3").disabled = true;
        }else if(numJugadores == "2"){
            document.getElementById("inputJugador3").disabled = true;
        }else if(numJugadores == "0"){
            document.getElementById("inputJugador1").disabled = true;
            document.getElementById("inputJugador2").disabled = true;
            document.getElementById("inputJugador3").disabled = true;
        }
        
        jugarPartida(numPartidas, numJugadores);
    }
}

async function jugarPartida(numPartidas, numJugadores){
    puntuacion1 = 0;
    puntuacion2 = 0;
    puntuacion3 = 0;

    for(var i = 0; i < numPartidas; i++){

        seleccion1 = 0;
        seleccion2 = 0;
        seleccion3 = 0;

        if(numJugadores == 0){
            seleccion1 = generAleatorio();
            seleccion2 = generAleatorio();
            seleccion3 = generAleatorio();
            await sleep(1000);
            document.getElementById("inputJugador1").value = seleccion1.toString();
            await sleep(2000);
            document.getElementById("inputJugador2").value = seleccion2.toString();
            await sleep(2000);
            document.getElementById("inputJugador3").value = seleccion3.toString();
            await sleep(2000);
        }
        numeroGanador = compruebaDiferente(seleccion1, seleccion2, seleccion3);
        if(numeroGanador == seleccion1){
            puntuacion1 ++;
            alert("Esta ronda la ha ganado el jugador 1");
        }else if(numeroGanador == seleccion2){
            puntuacion2 ++;
            alert("Esta ronda la ha ganado el jugador 2");
        }else if(numeroGanador == seleccion3){
            puntuacion3 ++;
            alert("Esta ronda la ha ganado el jugador 3");
        }

        document.getElementById("puntuacion1").innerHTML = "Puntuacion Jugador 1: " + puntuacion1.toString();
        document.getElementById("puntuacion2").innerHTML = "Puntuacion Jugador 2: " + puntuacion2.toString();
        document.getElementById("puntuacion3").innerHTML = "Puntuacion Jugador 3: " + puntuacion3.toString();

        limpiarCampos();
    }
    if(puntuacion1 > puntuacion2 && puntuacion1 > puntuacion3){
        alert("Ha ganado el Jugador 1");
    }else if(puntuacion2 > puntuacion1 && puntuacion2 > puntuacion3){
        alert("Ha ganado el Jugador 2");
    }else if(puntuacion3 > puntuacion1 && puntuacion3 > puntuacion2){
        alert("Ha ganado el Jugador 3");
    }
}

function limpiarCampos(){
    document.getElementById("inputJugador1").value = "";
    document.getElementById("inputJugador2").value = "";
    document.getElementById("inputJugador3").value = "";
}

function generAleatorio(){
    return Math.floor(Math.random() * 2) + 1;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function compruebaDiferente(num1, num2, num3){
    if(num1 != num2 && num1 != num3){
        return num1;
    }else if(num2 != num1 && num2 != num3){
        return num2;
    }else if(num3 != num1 && num3 != num2){
        return num3;
    }else{
        return 0;
    }
}