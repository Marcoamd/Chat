import { Usuario } from "./usuario";

export class Usuarios
{
    private lista:Usuario[] = [];

    public agregar(usuario:Usuario)
    {
        this.lista.push(usuario);
    }

    public getLista()
    {
        // let listaTemporal = this.lista.filter(usuario=> usuario.nombre != 'Sin nombre');
        let listaTemporal = this.lista.filter((usuario)=>{
            if(usuario.nombre != 'Sin nombre')
                return usuario;
        });
        return listaTemporal;
    }

    public actualizarNombre(id:string, nombre:string)
    {
        for(let usuario of this.lista)
        {
            if(usuario.id == id)
            {
                usuario.nombre = nombre;
                break;
            }
        }
    }

    public getUsuario(id:string)
    {
        for(let usuario of this.lista)
        {
            if(usuario.id == id)
            {
                return usuario;
            }
        }
    }

    public borrarUsuario(id:string)
    {
        this.lista = this.lista.filter((usuario)=>{
            if(usuario.id != id)
            {
                return usuario;
            }
        })
    }
}