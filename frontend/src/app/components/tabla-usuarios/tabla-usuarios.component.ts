import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Component, EventEmitter, Output } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-tabla-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent {
  displayedColumns = ['select', 'Id', 'Nombre', 'Correo', 'Edad'];
  usuarios: any[] = [];
  @Output() abrirFormulario = new EventEmitter<any>();

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: data => (this.usuarios = data),
      error: err => console.error('Error cargando usuarios', err)
    });
  }

  nuevo() {
    this.abrirFormulario.emit();
  }

  get isAnySelected(): boolean {
    return this.usuarios.some(u => u.selected);
  }

  toggleAll(event: any) {
    const checked = event.checked;
    this.usuarios.forEach(u => u.selected = checked);
  }

  actualizar() {
    const seleccionado = this.usuarios.find(u => u.selected);
    if (seleccionado) {
      this.abrirFormulario.emit(seleccionado);
    }
  }

  eliminar() {
    const seleccionado = this.usuarios.find(u => u.selected);
    if (seleccionado) {
      this.usuariosService.deleteUsuario(seleccionado.id).subscribe({
        next: () => this.cargarUsuarios(),
        error: err => console.error('Error eliminando usuario', err)
      });
    }
  }
}