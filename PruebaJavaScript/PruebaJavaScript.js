const operacion = +prompt("Introduce un tipo de operacion:");
switch(operacion){
    case 1: 
        multiplicar()
    break;
}
const multiplicar=(num1, num2)=>{
    +prompt(num1);
    +prompt(num2);
    alert(num1*num2);
}


