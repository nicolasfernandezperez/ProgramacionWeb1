const http = require('http');

const servidor = http.createServer((req, res) => {
    res.end("Hola Mundo");
});

const port = 3000;
servidor.listen(port, () => {
    console.log("Servidor escuchando en localhost puerto", port);
});