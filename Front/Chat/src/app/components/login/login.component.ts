import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';
declare var FB:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre: string;
  constructor(private _sWebsocket:WebsocketService, private _router:Router){
    if(localStorage.getItem('usuario'))
    {
      this.nombre = JSON.parse(localStorage.getItem('usuario')).nombre;
      this._sWebsocket.loginWs(this.nombre);
      this._router.navigateByUrl("/mensajes");
    }
  }

  ngOnInit() {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '163770187873857',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
      });
        
      FB.AppEvents.logPageView();   
        
    };
  
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  iniciarSesionFB()
  {
    FB.login((response)=>{
      if(response.authResponse)
      {
        //Inició sesión de forma exitosa
        console.log(response.authResponse);
        this.getUsersDetails(response.authResponse.userID);
      }
      else
      {
        console.log("Error al iniciar sesión");
      }
    });
  }

  getUsersDetails(id)
  {
    FB.api('/'+id+'/',{fields:'name,first_name,last_name,picture'},
    (response)=>{
      console.log("Error");
    },
    (response)=>{      
      console.log("Éxito");
      this.nombre = response.name;
      this._sWebsocket.loginWs(this.nombre);
      this._router.navigateByUrl("/mensajes");
    });
  }

  ingresar(evento)
  {
    evento.preventDefault();
    this._sWebsocket.loginWs(this.nombre);
    this._router.navigateByUrl("/mensajes");
  }

  cerrarSesion()
  {
    this._sWebsocket.cerrarSesion();
    this._router.navigateByUrl("/");
  }
}