import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(private _socket:Socket)
  {
    this.checkStatus();
  }

  checkStatus()
  {
    this._socket.on('connect',()=>{
      console.log("Conectado al servidor con socket");
      this.socketStatus = true;
    });

    this._socket.on('disconnect',()=>{
      console.log("Desconectado al servidor con socket");
      this.socketStatus = false;
    });
  }

  emitir(evento:string, payload:any)
  {
    this._socket.emit(evento,payload);
  }

  escuchar(evento:string)
  {
    return this._socket.fromEvent(evento);
  }
}
