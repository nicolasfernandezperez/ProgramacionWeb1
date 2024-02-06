const http = require('http');

const servidor = http.createServer((req, res) => {
    const miURL = new URL('https://www.ejemplo.org/cursos/programacion?ordenar=vistas&nivel=1');
    console.log(miURL.hostname);
    console.log(miURL.pathname);
    console.log(miURL.searchParams);
    console.log(miURL.searchParams.get('ordenar'))
    console.log(miURL.searchParams.get('nivel'))
    res.end("Hola Mundo");
});

const port = 3000;
servidor.listen(port, () => {
    console.log("Servidor escuchando en localhost puerto", port);
});

