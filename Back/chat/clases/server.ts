import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

// export default => por nombre del archivo
// export => por destructuración
export default class Server
{
    public app:express.Application;
    public puerto:any;
    public httpServer:http.Server;
    public io:socketIO.Server;

    constructor()
    {
        this.app = express();
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.puerto = process.env.PORT || 3700;
        this.escucharSockets();
    }

    escucharSockets()
    {
        console.log("Escuchando sockets");
        this.io.on('connect',(cliente)=>{
            console.log(`${cliente.id} se ha conectado`);
            cliente.on('disconnect',()=>{
                console.log(`${cliente.id} se ha desconectado`);
            });
            cliente.on('eviar-mensaje',(payload)=>{
                console.log(payload);
                this.io.emit('mensaje-nuevo', payload);
            });
        });
    }

    start()
    {
        this.httpServer.listen(this.puerto,()=>{
            console.log("Servidor iniciado correctamente =) en el puerto " + this.puerto);
        });
    }
}