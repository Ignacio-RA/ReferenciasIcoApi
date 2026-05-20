Usage
=====

Estructura principal
--------------------

- `index.js` — punto de entrada y configuración de rutas
- `config/db.js` — conexión a la base de datos (lee `.env`)
- `routes/` — definición de las rutas
- `controllers/` — lógica de negocio por recurso
- `models/` — definiciones de modelos Sequelize
- `middleware/` — middlewares de autenticación y autorización
- `helpers/` — utilidades (ej. generación de JWT)

Conexión a la base de datos
--------------------------

La conexión se configura en `config/db.js` y toma las variables desde `.env`.

Autenticación
-------------

- El JWT se genera con `helpers/generarJWT.js`.
- Las rutas protegidas esperan el header `Authorization: Bearer <token>`.

Ejecutar en desarrollo
----------------------

.. code-block:: bash

   npm run server

