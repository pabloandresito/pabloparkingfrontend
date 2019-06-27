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

  listVehiculosIngresados = null;

  constructor(private httpClient: HttpClient) {
    this.refrescarListaVehiculos();
  };
  headers = new HttpHeaders()
            .set("Content-Type", "application/json");
            //.set("Access-Control-Allow-Origin", "*");

  registroParqueoDto = {placa:null,
                        cilindraje:null,
                        tipoVehiculo:null 
                      };

  ingresar() {
    this.httpClient.post('http://localhost:8080/registro-parqueo/ingresar', this.registroParqueoDto, {headers:this.headers} )
      .subscribe(
        response => {
          this.textRetirar =  response.message;
        },
        error => {
          this.textError =  error.message;
        }
      );
  };

  refrescarListaVehiculos() {
    this.httpClient.get('http://localhost:8080/registro-parqueo/list-vehiculos')
      .subscribe(
        response => {
          this.listVehiculosIngresados = response;
        },
        error => {
          this.textError = error as string;
        }
      ); 
  };
}
