MODELS — Esquemas
==================

Usuario
-------

- ``id_usuario`` (INTEGER, PK, autoincrement)
- ``nombre`` (STRING, requerido)
- ``ap_paterno`` (STRING, requerido)
- ``ap_materno`` (STRING, opcional)
- ``correo`` (STRING, requerido, único)
- ``password`` (STRING, requerido) — se guarda hasheado (hook ``beforeCreate``).
- ``admin`` (BOOLEAN, default: false)
- ``fecha_registro`` (DATE, default: NOW)

Autor
-----

- ``id_autor`` (INTEGER, PK, autoincrement)
- ``nombre`` (STRING, requerido)
- ``ap_paterno`` (STRING, requerido)
- ``ap_materno`` (STRING, opcional)

Área
----

- ``id_area`` (INTEGER, PK, autoincrement)
- ``nombre`` (STRING, requerido)

Asignatura
----------

- ``id_asignatura`` (INTEGER, PK, autoincrement)
- ``clave`` (INTEGER, requerido, único)
- ``nombre`` (STRING, requerido)
- ``id_area`` (INTEGER, FK → ``area.id_area``)

Referencia
---------

- ``id_referencia`` (INTEGER, PK, autoincrement)
- ``tipo_fuente`` (ENUM: 'libro'|'articulo'|'pagina_web'|'video')
- ``titulo`` (STRING, requerido)
- ``anio_publicacion`` (STRING, opcional, default 's.f.')
- ``editorial`` (STRING, opcional)
- ``url`` (STRING, opcional)
- ``doi`` (STRING, opcional)
- ``volumen`` (INTEGER, opcional)
- ``numero`` (INTEGER, opcional)
- ``paginas`` (STRING, opcional)
- ``ciudad_pais`` (STRING, opcional)
- ``fecha_consulta`` (DATE, opcional)
- ``id_asignatura`` (INTEGER, FK → ``asignatura.id_asignatura``)
- ``id_usuario`` (INTEGER, FK → ``usuario.id_usuario``)

Relaciones principales
----------------------

- ``Area`` 1:N ``Asignatura``
- ``Asignatura`` 1:N ``Referencia``
- ``Usuario`` 1:N ``Referencia``
- ``Autor`` 1:N ``AutorReferencia`` (tabla puente)
- ``Referencia`` 1:N ``AutorReferencia`` (tabla puente)

Para detalles de la implementación de relaciones ver ``models/relaciones.js``.
