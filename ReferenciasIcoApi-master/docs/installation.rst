Installation
============

Requisitos
---------

- Node.js (14+)
- MariaDB o MySQL

Instalación
-----------

1. Clonar el repositorio
2. Instalar dependencias

.. code-block:: bash

   npm install

Variables de entorno
--------------------

Crear un archivo `.env` en la raíz con las siguientes variables:

- BD_NOMBRE — nombre de la base de datos
- BD_USUARIO — usuario de la base de datos
- BD_CLAVE — contraseña de la base de datos
- BD_DIALEC — dialecto (ej: `mariadb`)
- BD_HOST — host de la base de datos (ej: `localhost`)
- BD_PORT — puerto de la base de datos (ej: `3306`)
- JWT_SECRET — secreto para firmar tokens JWT

Generar la aplicación
---------------------

.. code-block:: bash

   npm run server

El servidor escucha por defecto en el puerto 4800.
