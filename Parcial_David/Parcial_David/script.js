const valorJugador = {
    UNO: 1,
    DOS: 2
};

nPartidas = null;
nJugadores = null;

nombreJugador1 = null;
nombreJugador2 = null;
nombreJugador3 = null;

valorJugador1 = null;
valorJugador2 = null;
valorJugador3 = null;

puntuacionJugador1 = null;
puntuacionJugador2 = null;
puntuacionJugador3 = null;

const setPuntuacionJugador1 = (puntuacion) =>{
    puntuacionJugador1 = puntuacion
}

const setPuntuacionJugador2 = (puntuacion) =>{
    puntuacionJugador2 = puntuacion
}
const setPuntuacionJugador3 = (puntuacion) =>{
    puntuacionJugador3 = puntuacion
}

const getPuntuacionJugador1 = () =>{
    return puntuacionJugador1
}
const getPuntuacionJugador2 = () =>{
    return puntuacionJugador2
}
const getPuntuacionJugador3 = () =>{
    return puntuacionJugador3
}
const setValorJugador1 = (valor) =>{
    valorJugador1 = valor
}
const setValorJugador2 = (valor) =>{
    valorJugador2 = valor
}
const setValorJugador3 = (valor) =>{
    valorJugador3 = valor
}

const getValorJugador1 = () =>{
    return valorJugador1
}
const getValorJugador2 = () =>{
    return valorJugador2
}
const getValorJugador3 = () =>{
    return valorJugador3
}

const setNombreJugador1 = (nombreJugador) =>{
    nombreJugador1 = nombreJugador
}
const setNombreJugador2 = (nombreJugador) =>{
    nombreJugador2 = nombreJugador
}   
const setNombreJugador3 = (nombreJugador) =>{
    nombreJugador3 = nombreJugador
}

const getNombreJugador1 = () => {
    return nombreJugador1
}
const getNombreJugador2 = () => {
    return nombreJugador2
}
const getNombreJugador3 = () => {
    return nombreJugador3
}

const setNpartidas = (numPartidas) => {
    nPartidas = numPartidas
}

const setNjugadores = (numJugadores) => {
    nJugadores = numJugadores;
    const jugador1 = document.getElementById("nombre1")
    const jugador2 = document.getElementById("nombre2")
    const jugador3 = document.getElementById("nombre3")

    switch(nJugadores){
        case 0:
            jugador1.textContent = "IA_1"
            jugador2.textContent = "IA_2"
            jugador3.textContent = "IA_3"

           setNombreJugador1("IA_1")
           setNombreJugador2("IA_2")
           setNombreJugador3("IA_3")

        break;
        case 1:
            jugador1.textContent = "jugador 1"
            jugador2.textContent = "IA_1"
            jugador3.textContent = "IA_2"

            setNombreJugador1("jugador 1")
            setNombreJugador2("IA_2")
            setNombreJugador3("IA_3")

        break;
        case 2:
            jugador1.textContent = "jugador 1"
            jugador2.textContent = "jugador 2"
            jugador3.textContent = "IA"

            setNombreJugador1("jugador 1")
            setNombreJugador2("jugador 2")
            setNombreJugador3("IA")
        break;
        case 3:
            jugador1.textContent = "jugador 1"
            jugador2.textContent = "jugador 2"
            jugador3.textContent = "jugador 3"

            setNombreJugador1("jugador 1")
            setNombreJugador2("jugador 2")
            setNombreJugador3("jugador 3")
        break;
    }
}


const getNpartidas = () =>{
    return nPartidas
}

const getNjugadores = () =>{
    return nJugadores;
}

const jugar = () => {
    if (getNjugadores() == null || getNpartidas() == null) {
        alert("Opciones inválidas");
    } else {
        console.log("Partidas: ", getNpartidas());
        console.log("Jugadores: ", getNjugadores());

        while (getNpartidas() > 0) {

            operarJugador1()
            operarJugador2()
            operarJugador3()

            verResultados()

            setNpartidas(getNpartidas() - 1);
        }
    }
}

const generarAleatorio = () =>{
   
    const numeroAleatorio = Math.floor(Math.random() * 2) + 1;
    console.log(numeroAleatorio);
    return numeroAleatorio

}

const operarJugador1 = () =>{
    
    if(getNombreJugador1() == "jugador 1"){
        const respuesta = prompt("Jugador 1\n1-Uno\n2-Dos");
        console.log("JUGADOR ! en")
        switch(respuesta){
            case '1':  
                setValorJugador1(valorJugador.UNO)
            break;
            case '2':
                setValorJugador1(valorJugador.DOS)
            break;

            default:
                alert("opcion no valida")
            break;
        }
       
    }else{
        const num = generarAleatorio();
        if(num == 1){
            
            setValorJugador1(valorJugador.UNO)
        }else{
            
            setValorJugador1(valorJugador.DOS)
        }
    }
    
}

const operarJugador2 = () =>{
    console.log(getNombreJugador2())
    if(getNombreJugador2() == "jugador 2"){
        const respuesta = prompt("Jugador 2\n1-Uno\n2-Dos");
        
        switch(respuesta){
            case '1':  
                setValorJugador2(valorJugador.UNO)
            break;
            case '2':
                setValorJugador2(valorJugador.DOS)
            break;

            default:
                alert("opcion no valida")
            break;
        }
       
    }else{
        const num = generarAleatorio();
        if(num == 1){
        
            setValorJugador2(valorJugador.UNO)
        }else{
            
            setValorJugador2(valorJugador.DOS)
        }
    }
}

const operarJugador3 = () =>{
    if(getNombreJugador3() == "jugador 2"){
        const respuesta = prompt("Jugador 3\n1-Uno\n2-Dos");
        console.log("JUGADOR ! en")
        switch(respuesta){
            case '1':  
                setValorJugador3(valorJugador.UNO)
            break;
            case '2':
                setValorJugador3(valorJugador.DOS)
            break;

            default:
                alert("opcion no valida")
            break;
        }
       
    }else{
        const num = generarAleatorio();
        if(num == 1){
           
            setValorJugador3(valorJugador.UNO)
        }else{
            
            setValorJugador3(valorJugador.DOS)
        }
    }
}

const verResultados = () =>{
    const img1 = document.getElementById("img1")
    const img2 = document.getElementById("img2")
    const img3 = document.getElementById("img3")

    const puntuacion1 = document.getElementById("puntuacion1")
    const puntuacion2 = document.getElementById("puntuacion2")
    const puntuacion3 = document.getElementById("puntuacion3")

    if (getValorJugador1() == valorJugador.UNO){
        img1.src = "images/uno.png"
    }else{
        img1.src = "images/dos.png"
    }

    if (getValorJugador2() == valorJugador.UNO){
        img2.src = "images/uno.png"
    }else{
        img2.src = "images/dos.png"
    }

    if (getValorJugador3() == valorJugador.UNO){
        img3.src = "images/uno.png"
    }else{
        img3.src = "images/dos.png"
    }


    if (getValorJugador1() !== getValorJugador2() && getValorJugador1() !== getValorJugador3()) {
        console.log("El Jugador 1 tiene un valor diferente.");
        setPuntuacionJugador1(getPuntuacionJugador1() + 1)
        puntuacion1.textContent = getPuntuacionJugador1();
    } else if (getValorJugador2() !== getValorJugador1() && getValorJugador2() !== getValorJugador3()) {
        console.log("El Jugador 2 tiene un valor diferente.");
        setPuntuacionJugador2(getPuntuacionJugador2() + 1)
        puntuacion2.textContent = getPuntuacionJugador2();
    } else if (getValorJugador3() !== getValorJugador1() && getValorJugador3() !== getValorJugador2()) {
        console.log("El Jugador 3 tiene un valor diferente.");
        setPuntuacionJugador3(getPuntuacionJugador3() + 1)
        puntuacion3.textContent = getPuntuacionJugador3();
    } else {
        console.log("EMPATE");
    }
    
    
}

const reiniciar = () =>{
    setValorJugador1(null);
    setValorJugador2(null);
    setValorJugador3(null);

    setPuntuacionJugador1(0);
    setPuntuacionJugador2(0);
    setPuntuacionJugador3(0);

    setNjugadores(null)
    setNpartidas(null)
    

    const puntuacion1 = document.getElementById("puntuacion1")
    const puntuacion2 = document.getElementById("puntuacion2")
    const puntuacion3 = document.getElementById("puntuacion3")

    const img1 = document.getElementById("img1")
    const img2 = document.getElementById("img2")
    const img3 = document.getElementById("img3")

    puntuacion1.textContent = getPuntuacionJugador1();
    puntuacion2.textContent = getPuntuacionJugador2();
    puntuacion3.textContent = getPuntuacionJugador3();

    img1.src = "images/cero.png"
    img2.src = "images/cero.png"
    img3.src = "images/cero.png"
}