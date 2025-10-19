Manual de Usuario Técnico — Proyecto Full Stack (Angular + Java + Node.js + PostgreSQL)
1. Descripción General
Este proyecto implementa una arquitectura full stack compuesta por tres capas principales:

- Frontend: desarrollado en Angular, encargado de la interfaz de usuario y la comunicación con ambos backends.
- Backend Java: implementado con Apache Tomcat 9.0.95, expone servicios REST para operaciones CRUD (Create, Update, Delete) sobre la base de datos.
- Backend Node.js: desarrollado con Express.js, se encarga de la consulta general (GET) de los datos mediante un procedimiento almacenado en PostgreSQL.
- Base de datos: motor PostgreSQL, donde se almacenan los datos del sistema.

2. Requisitos Previos
Antes de ejecutar el proyecto, asegúrese de contar con lo siguiente instalado y configurado en su entorno local:

| Componente | Versión recomendada | Descripción |
|------------|---------------------|-------------|
| Java JDK | 17 o superior | Requerido para ejecutar el backend Java. |
| Apache Tomcat | 9.0.95 | Servidor de aplicaciones para el backend Java. |
| Node.js | 18.x o superior | Requerido para ejecutar el backend Node.js. |
| npm | 9.x o superior | Administrador de paquetes para Node.js. |
| Angular CLI | 17.x o superior | Para compilar y ejecutar el frontend. |
| PostgreSQL | 14 o superior | Base de datos relacional utilizada. |
| Postman | Última versión | Para realizar pruebas de las APIs.

3. Estructura del Proyecto
/proyecto-fullstack
│
├── /frontend-angular       → Proyecto Angular
├── /backend-java           → Proyecto Java (WAR o carpeta fuente)
├── /backend-node           → Proyecto Node.js con Express
└── /database               → Scripts SQL y procedimientos almacenados

4. Configuración de la Base de Datos
1. Inicie el servidor de PostgreSQL.
2. Cree una base de datos, por ejemplo:
   CREATE DATABASE prueba_tecnica;
3. Ejecute el script SQL ubicado en la carpeta /database para crear las tablas y el procedimiento almacenado.
4. Verifique la conectividad y credenciales en los archivos de configuración de ambos backends (Java y Node).

5. Ejecución de los Backends
Backend Java (Tomcat):
1. Compile el proyecto Java y genere el archivo .war si aplica.
2. Copie el archivo .war al directorio: C:\apache-tomcat-9.0.95\webapps
3. Inicie el servidor Tomcat: C:\apache-tomcat-9.0.95\bin\startup.bat
4. El backend estará disponible en: http://localhost:8080/
5. Endpoints disponibles:
   - POST /api/entidad → Insertar registro
   - PUT /api/entidad/{id} → Actualizar registro
   - DELETE /api/entidad/{id} → Eliminar registro

Backend Node.js (Express):
1. Abra una terminal en /backend-node.
2. Instale dependencias: npm install
3. Ejecute el servidor: npm start
4. Disponible en: http://localhost:3000/
5. Endpoint disponible: GET /api/entidad → Obtiene todos los registros.

6. Ejecución del Frontend (Angular)
1. Abra una terminal en /frontend-angular.
2. Instale dependencias: npm install
3. Verifique las URLs de los backends en /src/environments/environment.ts:
   export const environment = {
     production: false,
     apiJavaUrl: 'http://localhost:8080/api',
     apiNodeUrl: 'http://localhost:3000/api'
   };
4. Ejecute el servidor: ng serve
5. Disponible en: http://localhost:4200/

7. Pruebas con Postman
1. Abra Postman y cree una colección llamada 'Pruebas Proyecto Full Stack'.
2. Configure las siguientes solicitudes:

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | http://localhost:3000/api/entidad | Obtiene todos los registros (Node.js). |
| POST | http://localhost:8080/api/entidad | Inserta un nuevo registro (Java). |
| PUT | http://localhost:8080/api/entidad/{id} | Actualiza un registro existente (Java). |
| DELETE | http://localhost:8080/api/entidad/{id} | Elimina un registro (Java). |

3. Ejemplo de cuerpo JSON para POST/PUT:
   {
     "id": 1,
     "nombre": "Ejemplo",
     "descripcion": "Registro de prueba"
   }
4. Verifique que las respuestas sean exitosas (HTTP 200 o 201).

8. Orden de Ejecución Recomendado
1. Iniciar PostgreSQL.
2. Levantar el backend Java (Tomcat).
3. Levantar el backend Node.js (Express).
4. Iniciar el frontend Angular.
5. Realizar pruebas desde el navegador o Postman.

9. Consideraciones Finales
- Asegúrese de que los puertos 8080, 3000 y 4200 estén libres.
- Si se modifican credenciales o URLs, actualice los archivos correspondientes.
- Para producción, configure proxies reversos y variables de entorno seguras.

