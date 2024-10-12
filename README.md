#NODE JS POSTGRESQL
#   B a c k e n d G e s t i o n 
 
 #   B a c k e n d G e s t i o n 
 
 # Project Task API

Este es el backend de la aplicación Project Task, que permite gestionar proyectos y tareas. Este backend está construido con Node.js, Express y PostgreSQL.

## Índice

- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints](#endpoints)



## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework de Node.js para construir APIs y aplicaciones web.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional.
- **jwt**:  Para crear un token que sirva para enviar datos entre aplicaciones o servicios 

## Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/tomigonzalez/BackendGestion.git
   
## Endpoints

Proyectos
GET /api/projects - Obtener todos los proyectos.
POST /api/projects - Crear un nuevo proyecto.
GET /api/projects/:id - Obtener un proyecto específico por ID.
PUT /api/projects/:id - Actualizar un proyecto específico por ID.

DELETE /api/projects/:id - Eliminar un proyecto específico por ID.
POST /projects/:id/assign-user - Asignar usuario a un Proyecto

Tareas
GET /api/tasks - Obtener todas las tareas.
POST /api/tasks - Crear una nueva tarea.
GET /api/tasks/:id - Obtener una tarea específica por ID.

PUT /tasks/:id/assign-user - Este endpoint se utiliza para asignar un usuario a una tarea específica.
GET /tasks/user - Este endpoint permite obtener todas las tareas asignadas al usuario autenticado

Usuarios
POST /api/users/register - Registrar un nuevo usuario.
POST /api/users/login - Iniciar sesión con un usuario existente.

