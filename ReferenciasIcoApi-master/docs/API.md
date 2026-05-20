# API — Endpoints

Base URL: `http://localhost:4800`

## Usuarios

- `POST /usuarios` — Crear usuario. Protegido: `checkAuth`, `checkAdmin`.
- `GET /usuarios` — Listar usuarios. Protegido: `checkAuth`.
- `GET /usuarios/:id` — Obtener usuario por ID. Protegido: `checkAuth`.
- `PATCH /usuarios/:id` — Actualizar usuario. Protegido: `checkAuth`, `checkAdmin`.
- `DELETE /usuarios/:id` — Eliminar usuario. Protegido: `checkAuth`, `checkAdmin`.
- `POST /usuarios/login` — Login (devuelve JWT).

Ejemplo de login (body JSON):

```json
{
  "correo": "usuario@dominio.com",
  "password": "tuPassword"
}
```

## Autores

- `POST /autores` — Crear autor.
- `GET /autores` — Listar autores.
- `GET /autores/:id` — Obtener autor por ID.
- `PATCH /autores/:id` — Actualizar autor.
- `DELETE /autores/:id` — Eliminar autor.

## Áreas

- `POST /areas` — Crear área.
- `GET /areas` — Listar áreas.
- `GET /areas/:id` — Obtener área por ID.
- `PATCH /areas/:id` — Actualizar área.
- `DELETE /areas/:id` — Eliminar área.

## Asignaturas

- `POST /asignaturas` — Crear asignatura.
- `GET /asignaturas` — Listar asignaturas.
- `GET /asignaturas/:id` — Obtener asignatura por ID.
- `PATCH /asignaturas/:id` — Actualizar asignatura.
- `DELETE /asignaturas/:id` — Eliminar asignatura.

## Referencias

- `POST /referencias` — Crear referencia. Protegido: `checkAuth`.
- `GET /referencias` — Listar referencias. Protegido: `checkAuth`.
- `GET /referencias/:id` — Obtener referencia por ID. Protegido: `checkAuth`.
- `PATCH /referencias/:id` — Actualizar referencia. Protegido: `checkAuth`.
- `DELETE /referencias/:id` — Eliminar referencia. Protegido: `checkAuth`, `checkAdmin`.

### Notas sobre autenticación

- Las rutas protegidas esperan un JWT en el header `Authorization: Bearer <token>`.
- El token se obtiene con `POST /usuarios/login`.
