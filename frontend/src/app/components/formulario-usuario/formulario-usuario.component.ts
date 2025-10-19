import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsuariosService } from '../../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-usuario-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})

export class FormularioUsuarioComponent {
  formUsuario: FormGroup;

  @Input() usuario: any = null;
  @Output() cerrar = new EventEmitter<any>();
  @Output() actualizado = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService) {
    this.formUsuario = this.fb.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      correo: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['usuario'] && this.usuario) {
      this.formUsuario.patchValue(this.usuario);
    } else {
      this.formUsuario.reset();
    }
  }

  guardarUsuario() {
    if (this.formUsuario.invalid) return;
    const data = this.formUsuario.value;
    if (data.id) {
      this.actualizarUsuario(data);
    } else {
      this.crearUsuario(data);
    }
  }

  private crearUsuario(usuario: any) {
    this.usuariosService.createUsuario(usuario).subscribe({
      next: () => {
        this.actualizado.emit(); 
        this.cerrar.emit();
      },
      error: err => console.error('Error al crear usuario:', err)
    });
  }

  private actualizarUsuario(usuario: any) {
    this.usuariosService.updateUsuario(usuario).subscribe({
      next: () => {
        this.actualizado.emit(); 
        this.cerrar.emit();
      },
      error: err => console.error('Error al actualizar usuario:', err)
    });
  }

  cancelarFormulario() {
    this.formUsuario.reset();
    this.cerrar.emit();
  }
}
