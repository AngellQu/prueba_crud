import { CommonModule } from '@angular/common';
import { Component, ViewChild} from '@angular/core';
import { TablaUsuariosComponent } from './components/tabla-usuarios/tabla-usuarios.component';
import { FormularioUsuarioComponent } from './components/formulario-usuario/formulario-usuario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TablaUsuariosComponent, FormularioUsuarioComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  usuarioSeleccionado: any = null;
  mostrarFormularioActivo = false;
  @ViewChild(TablaUsuariosComponent) tablaUsuarios!: TablaUsuariosComponent;

  mostrarFormulario(usuario: any) {
    this.usuarioSeleccionado = usuario;
    this.mostrarFormularioActivo = true;
  }

  cerrarFormulario() {
    this.mostrarFormularioActivo = false;
    this.usuarioSeleccionado = null;
  }

  refrescarTabla(){
    this.tablaUsuarios.cargarUsuarios(); 
  }
}
