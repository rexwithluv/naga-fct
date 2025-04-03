# NAGA-FCT

**NAGA-FCT** (abreviado simplemente como ***NAGA***, *Núcleo o Nexo de Administración y Gestión del Alumnado en FCT*) es un proyecto que **permite a los docentes tener en una única aplicación todo lo necesario para administrar y gestionar las FCT** del alumnado de Ciclos Formativos.

NAGA nace a partir de la necesidad del profesorado por tener una plataforma que enlace y centralice las demás aplicaciónes (consulta del alumnado, envío de emails, fechas de revisiones) que permiten almacenar y contactar a las empresas.

## Stack tecnológico

- **Frontend**: Vue (HTML, CSS y JavaScript)
- **Backend**: SpringBoot (Java)
- **Base de datos**: MariaDB (SQL)
- **Contenedores**: Docker

## Instalación y Configuración

### 1. Clona el repositorio

```bash
git clone https://github.com/rexwithluv/naga-fct.git
cd naga-fct
```

### 2. Configurar variables de entorno

El repositorio incluye varios archivos `.example` que contienen las variables de entorno que usan los distintos contenedores. Copia el archivos `.example` y renómbralos para poder comenzar a desplegar la aplicación.

#### Pasos

1. Copia y edita los archivos de ejemplo

   ```bash
   cp .env.example .env
   ```

2. Levanta los servicios con docker

   ```bash
   docker compose up -d --build
   ```

## Estructura del Proyecto

``` md
├── backend/
├── db/
│   ├── database.dbml      # .dbml de la estructura base de la DB
│   ├── schema.sql         # Estructura base de la DB
│   └── seed.sql           # Datos de prueba para la DB
├── docs/
│   ├── MR.png             # Modelo relacional de la DB
│   └── QyA.md             # Decisiones tomadas durante el desarrollo
├── frontend/
├── .env                   # Variables de entorno
├── docker-compose.yml     # Orquestación de contenedores
└── README.md              # Este archivo
```

## Uso

### 1. Acceso al Frontend

Después de levantar los contenedores con Docker Compose, puedes acceder a la interfaz de usuario del frontend en:

[http://localhost:6321](http://localhost:6321)

### 2. Acceso al Backend

El backend de Spring Boot estará disponible en:

[http://localhost:9000](http://localhost:9000)

### 3. Acceso a la Base de Datos (MariaDB)

Puedes conectarte a la base de datos MariaDB con el contenedor PHPMyAdmin que se despliega con docker o una herramienta de tu elección (como MySQL Workbench o desde la línea de comandos).

- **MariaDB con MySQL Workbench**: [http://localhost:3306](http://localhost:3306)
- **PHPMyAdmin**: [http://localhost:8080](http://localhost:8080)

- **Usuario**: `root`
- **Contraseña**: `changeme`
- **Base de datos**: `db`

## Licencia

Este proyecto está bajo la licencia [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html). Consulta el archivo [LICENSE](./LICENSE) para más detalles.
