FROM postgres:17

# Configuramos los locales
RUN localedef -i es_ES -c -f UTF-8 -A /usr/share/locale/locale.alias es_ES.UTF-8
ENV LANG=es_ES.utf8
ENV TZ=Europe/Madrid

# Instalamos las extensiones necesarias
RUN apt-get update && apt-get install -y postgresql-17-cron postgresql-17-partman

# Ejecutamos un script al iniciar la DB
# COPY init.sql /docker-entrypoint-initdb.d/
