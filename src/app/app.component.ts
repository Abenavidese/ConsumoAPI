import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import { CommonModule } from '@angular/common'
import { Cliente } from './cliente.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ConsumoAPI';


  clientes: Cliente[] = [];
  newCliente: Cliente = { cedula: '', nombre: '', direccion: '' };
  updateClienteData: Cliente = { cedula: '', nombre: '', direccion: '' };

  selectedCliente: Cliente | null = null;

  constructor(private clienteService: ClienteService, private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  createCliente(): void {
    this.clienteService.createCliente(this.newCliente).subscribe(cliente => {
      this.clientes.push(cliente);
      this.newCliente = { cedula: '', nombre: '', direccion: '' };
    });
  }

  selectCliente(cliente: Cliente): void {
    this.updateClienteData = { ...cliente };
  }

  updateCliente(): void {
    if (this.updateClienteData.cedula) {
      this.clienteService.updateCliente(this.updateClienteData).subscribe(() => {
        this.getClientes();
        this.updateClienteData = { cedula: '', nombre: '', direccion: '' };
      });
    }
  }


  
  deleteCliente(cedula: string): void {
    this.clienteService.deleteCliente(cedula).subscribe(() => {
      this.clientes = this.clientes.filter(cliente => cliente.cedula !== cedula);
    });
  }




  
  
}
