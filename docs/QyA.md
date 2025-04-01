# Preguntas y respuestas

## Por qué MariaDB y no MySQL?

- Es gratuito y de código abierto (FOSS).
- Mayor flexibilidad.
- Mayor rendimiento en el almacenamiento.
- Optimización de consultas.
- Reparación de tablas en caliente.
- Preferencias de escalabilidad.

## Por qué en el archivo `docker-compose.yml` le pasas una variable de entorno `SPRING_PROFILES_ACTIVE=prod` al backend?

Habitualmente trabajo levantando el backend desde VSCode, pero cuando quiero hacer pruebas para asegurarme de que el código funcionará en producción esa variable de entorno me sirve para que tome un `.properties` distinto.

## Cuando usas rutas dentro del frontend, siempre usas un parámetro `name` en lugar de directamente usar la ruta

Según buenas prácticas, es preferible referirse a las rutas internas por el nombre dado en el router de Vue en lugar de por la ruta absoluta, pues esto puede ocasionar:

- La recarga de la página y por lo tanto, el borrado de datos almacenamos en la sesión.
- Si por algún motivo cambian las rutas, todas estas redirecciones fallarían. En cambio es más raro que podamos cambiar el nombre de una ruta.
