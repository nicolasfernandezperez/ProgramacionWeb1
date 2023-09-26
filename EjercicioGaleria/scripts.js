let cont = 0;
const fotos = ["EjercicioGaleria/lambo01.jpg", "EjercicioGaleria/gtr02.jpg", "EjercicioGaleria/rally03.jpg"];
const prev = () => {
    cont --;
    if(cont < 0) {
        cont = fotos.length - 1;
    }
    document.getElementById("image").src = fotos[cont];
};

const next = () =>{
    cont ++;
    if(cont >= fotos.length){
        cont = 0;
    }
    document.getElementById("image").src = fotos[cont];
};
document.getElementById("prevButton").onclick = prev;
document.getElementById("nextButton").onclick = next;

