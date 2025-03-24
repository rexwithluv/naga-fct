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
