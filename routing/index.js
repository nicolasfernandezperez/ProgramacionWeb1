const http = require("http");
const cursos = require("./cursos");
const servidor = http.createServer((req, res)=>{
    switch(req.method){
        case 'GET':
            return manejarSolicitudesGET(req, res);
        case 'POST':
            return manejarSolicitudesPOST(req, res);
        case 'PUT':
            return manejarSolicitudesPUT(req, res);
        case 'DELETE':
            return manejarSolicitudesDELETE(req, res);
        default:"Error";
    }

    function manejarSolicitudesGET(req, res){
        const path = req.url;
        if(path === '/'){
            return res.end("Bienvenido al primer servidor")
        }else if(path === '/cursos'){
            return res.end(JSON.stringify(cursos.infoCursos));
        }else if(path === '/cursos/programacion'){
            return res.end(JSON.stringify(cursos.infoCursos.programacion));
        }else{
            res.statusCode = 404;
        }
    }

    function manejarSolicitudesPOST(req, res){
        const path = req.url;
        if(path === '/cursos/programacion'){
            let body = "";
            req.on("data", (content) =>{
                body += content.toString();
            })
            req.on("end", ()=>{
                console.log(typeof body, body);
                body = JSON.parse(body);
                console.log(typeof body, body.titulo);
                return res.end("Procedimiento POST finalizado" + path);
            })
        }else{
            res.statusCode = 404;
            return res.end("No existe el curso indicado" + path);
        }
    }
});

const port = 3000;
servidor.listen(port, () => {
    console.log("Servidor escuchando en localhost puerto", port);
});


