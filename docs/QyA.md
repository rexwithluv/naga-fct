# Preguntas y respuestas

## Por qué MariaDB y no MySQL?

- Es gratuito y de código abierto (FOSS, *Free and Open Source Software*).
- Mayor flexibilidad.
- Mayor rendimiento en el almacenamiento.
- Optimización de consultas.
- Reparación de tablas en caliente.
- Preferencias de escalabilidad.

## Cuando se usan rutas dentro del frontend, siempre se llama un parámetro `name` en lugar de directamente usar la ruta

Según buenas prácticas, es preferible referirse a las rutas internas por el nombre dado en el router de Vue en lugar de por la ruta absoluta, pues esto puede ocasionar:

- La recarga de la página y por lo tanto, el borrado de datos almacenamos en la sesión.
- Si por algún motivo cambian las rutas, todas estas redirecciones fallarían. En cambio es más raro que podamos cambiar el nombre de una ruta.

## En el archivo `docker-compose.yml` se utiliza un script .sh para comprobar la salud del container de la base de datos pero no está definido en nginuna parte

En la documentación oficial de MariaDB aparece este script que viene propiamente incluido en todas las versiones de MariaDB para docker. La opción `--connect` comprueba que no solo está el contenedor levantado sino que además es posible conectarse a la DB. Por otro lado, `--innodb_initalized` comprueba que el motor está listo para aceptar consultas CRUD.

## No se levantan todos los contenedores con `docker compose up -d --build backend frontend`

Existen dos contenedores adicionales:

- `db-dev`: Un contenedor similar a `db` pero únicamente para pruebas y desarrollo. Sus datos no persisten, se rellena con datos ficticios y expone el puerto 3306.
- `pma`: Abreviación de *PHPMyAdmin*. En desarrollo puede ser necesario tener una aplicación que gestione la BD pero en producción todas las operaciones deberían hacerse mediante el frontend de NAGA para evitar incosistencias.

## Algunas entidades del backend tienen varios DTOs

Aquellas entidades que pueden ser solicitadas tanto por usuarios comunes como por usuarios administradores tienen varios DTO porque algunos atributos pueden solo querer enviarse a los administradores y viceversa con los usuarios comunes.
