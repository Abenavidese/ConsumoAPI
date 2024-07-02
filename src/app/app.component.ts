import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import { CommonModule } from '@angular/common'
import { Cliente } from './cliente.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  clienteForm: FormGroup;
  selectedCliente: Cliente | null = null;

  constructor(private clienteService: ClienteService, private fb: FormBuilder) {
    this.clienteForm = this.fb.group({
      clienteId: [''],
      cedula: [''],
      nombre: [''],
      direccion: ['']
    });
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
    this.selectedCliente = cliente;
    this.clienteForm.patchValue(cliente);
  }

  updateCliente(): void {
    if (this.selectedCliente) {
      const updatedCliente = this.clienteForm.value;
      this.clienteService.updateCliente(updatedCliente).subscribe(() => {
        this.getClientes();
        this.selectedCliente = null;
        this.clienteForm.reset();
      });
    }
  }

  deleteCliente(cedula: string): void {
    this.clienteService.deleteCliente(cedula).subscribe(() => {
      this.clientes = this.clientes.filter(cliente => cliente.cedula !== cedula);
    });
  }




  
  
}
