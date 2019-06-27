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
          this.success(response);
        },
        error => {
          this.error(error);
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
          this.error(error);
        }
      ); 
  };

  success(res) {
    this.refrescarListaVehiculos();
    this.limpiarFormulario();
    this.textRetirar = res.message;
  };

  error(res) {
    this.textRetirar = "";
    this.textError = res.error;
  };

  limpiarFormulario() {
    this.registroParqueoDto.placa = "";
    this.registroParqueoDto.tipoVehiculo = "";
    this.registroParqueoDto.cilindraje = "";
    this.textError = "";
    this.textRetirar = "";
  };
}
