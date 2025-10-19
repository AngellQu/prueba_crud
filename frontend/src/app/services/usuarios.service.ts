import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private getUrl = 'http://localhost:3000/usuarios';
  private cudUrl = 'http://localhost:8080/prueba_crud/api-app';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]>{
    return this.http.get<any[]>(this.getUrl);
  }

  createUsuario(usuario: any): Observable<any>{
    return this.http.post<any>(this.cudUrl, usuario);
  }

  updateUsuario(usuario: any): Observable<any>{
    return this.http.put<any>(this.cudUrl, usuario);
  }

  deleteUsuario(id: number): Observable<any>{
    const body = { id };
    return this.http.delete<any>(this.cudUrl, { body });
  }
}
