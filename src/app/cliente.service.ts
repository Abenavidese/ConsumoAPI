import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Cliente {
  cedula: string;
  nombre: string;
  direccion: string;
}


@Injectable({
  providedIn: 'root'
})


export class ClienteService {

  private apiUrl = 'http://localhost:8080/demojakarta/rs/cliente'; // URL de tu servicio web


  constructor(private http: HttpClient) { }



  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }
  updateCliente(cliente: Cliente): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}?id=${cliente.cedula}`, cliente);
  }



  deleteCliente(cedula: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${cedula}`);
  }
  

  }



