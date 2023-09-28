function calcular(){
    var base = parseFloat(document.getElementById("base").value);
    var altura = parseFloat(document.getElementById("altura").value);
    var radio = document.getElementById("figura");
    var result;

    document.getElementById("triangulo").checked ?
        result = base * altura / 2 : result = base * altura;
    document.getElementById("resultado").value = result;
}