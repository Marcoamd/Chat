import { Component, OnInit } from '@angular/core';
declare var FB:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre: string;
  constructor() { }

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
      console.log("1");
      console.log(response);
    },
    (response)=>{      
      console.log("2");
      console.log(response);
    });
  }
}