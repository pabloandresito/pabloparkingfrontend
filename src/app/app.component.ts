import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pablo Parking';
  textError = "";
  textRetirar = "";

  constructor(private httpClient: HttpClient) {};
  headers = new HttpHeaders()
            .set("Content-Type", "application/json");
            //.set("Access-Control-Allow-Origin", "*");

  registroParqueoDto = {placa:null,
                        cilindraje:null,
                        tipoVehiculo:null 
                      };

  ingresar() {
    return this.httpClient.post('http://localhost:8080/registro-parqueo/ingresar', this.registroParqueoDto, {headers:this.headers} )
      .subscribe(
        response => {
          return response as string;
        }
      );
      
    //return this.httpClient.get('localhost:8080/registro-parqueo/list-vehiculos');
  };
}
