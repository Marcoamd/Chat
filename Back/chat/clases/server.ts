import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import { Usuarios } from './usuarios';
import { Usuario } from './usuario';

// export default => por nombre del archivo
// export => por destructuración
export default class Server
{
    public app:express.Application;
    public puerto:any;
    public httpServer:http.Server;
    public io:socketIO.Server;
    public usuariosConectados:Usuarios = new Usuarios();

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

            this.usuariosConectados.agregar(new Usuario(cliente.id));
            console.log("Lista de usuarios:\n", this.usuariosConectados.getLista());

            this.io.emit('usuarios-activos', this.usuariosConectados.getLista());

            cliente.on('disconnect',()=>{
                console.log(`${cliente.id} se ha desconectado`);
                this.usuariosConectados.borrarUsuario(cliente.id);
                this.io.emit('usuarios-activos', this.usuariosConectados.getLista());
            });
            cliente.on('eviar-mensaje',(payload)=>{
                console.log(payload);
                this.io.emit('mensaje-nuevo', payload);
            });

            cliente.on("configurar-usuario",(usuario)=>{
                this.usuariosConectados.actualizarNombre(cliente.id, usuario.nombre);
                console.log(this.usuariosConectados.getLista());
            });

            cliente.on("cerrar-sesion",()=>{
                this.usuariosConectados.actualizarNombre(cliente.id, "Sin nombre");
                this.io.emit('usuarios-activos', this.usuariosConectados.getLista());
            });

            cliente.on("obtener-usuarios",()=>{
                console.log("Alguien se ha conectado a la sala.");
                this.io.emit("usuarios-activos",this.usuariosConectados.getLista());
                // this.io.in(cliente.id).emit() => emite un socketpara un cliente en específico, dado su id
                // this.io.in(cliente.id).emit("usuarios-activos",this.usuariosConectados.getLista());
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