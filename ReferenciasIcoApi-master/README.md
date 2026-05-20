# ReferenciasIcoApi

API REST para gestionar referencias bibliográficas y recursos de información.

## Resumen

Proyecto en Node.js + Express + Sequelize (MariaDB) que permite crear, leer, actualizar y eliminar usuarios, autores, áreas, asignaturas y referencias.

## Requisitos

- Node.js (14+)
- MariaDB o MySQL

## Instalación

1. Clonar el repositorio
2. Instalar dependencias

```bash
npm install
```

3. Crear un archivo `.env` en la raíz con las siguientes variables (toma el archivo `.env.example` de ejemplo, como su nombre lo sugeriria):

- `BD_NOMBRE` — nombre de la base de datos
- `BD_USUARIO` — usuario de la base de datos
- `BD_CLAVE` — contraseña de la base de datos
- `BD_DIALEC` — dialecto (ej: `mariadb`)
- `BD_HOST` — host de la base de datos (ej: `localhost`)
- `BD_PORT` — puerto de la base de datos (ej: `3306`)
- `JWT_SECRET` — secreto para firmar tokens JWT

4. Levantar el servidor (desarrollo):

```bash
npm run server
```

El servidor escucha por defecto en el puerto `4800`.

## Estructura principal

- `index.js` — punto de entrada y configuración de rutas
- `config/db.js` — conexión a la base de datos (lee `.env`)
- `routes/` — definición de las rutas
- `controllers/` — lógica de negocio por recurso
- `models/` — definiciones de modelos Sequelize
- `middleware/` — middlewares de autenticación y autorización
- `helpers/` — utilidades (ej. generación de JWT)

## Documentación adicional

- Versión Sphinx (Divio-style): `docs/` (RST)
- Endpoints y ejemplos: `docs/api.rst`
- Modelos y campos: `docs/models.rst`

Generar documentación mediante Sphinx (basicamente hace que la documentación se vea bonita y formateada de manera adecuada)
-----------------------------

Instalar dependencias:

```bash
pip install -r docs/requirements-docs.txt
```

Construir HTML:

```bash
sphinx-build -b html docs/ docs/_build/html
```

O alternativamente:

```bash
python -m sphinx -b html docs/ docs/_build/html
```

---
