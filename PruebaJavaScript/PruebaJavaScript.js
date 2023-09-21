const operacion = +prompt("Introduce un tipo de operacion:\n1.Multiplicacion");
switch(operacion){
    case 1: 
        multiplicar()
    break;
}

const multiplicar=()=>{
    const num1 = prompt("Introduce el primer numero:");
    const num2 = prompt("Introduce el segundo numero:");
    const resultado = num1 * num2;
    alert(resultado);
}



