let cont = 0;
const fotos = ["images/lambo01.jpg", "images/gtr02.jpg", "images/rally03.jpg"];
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


