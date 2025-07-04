# NAGA-FCT

**NAGA-FCT** (abreviado simplemente como ***NAGA***, *Núcleo o Nexo de Administración y Gestión del Alumnado en FCT*) es un proyecto que **permite a los docentes tener en una única aplicación todo lo necesario para administrar y gestionar las FCT** del alumnado de Ciclos Formativos.

NAGA nace a partir de la necesidad del profesorado por tener una plataforma que enlace y centralice las demás aplicaciónes (consulta del alumnado, envío de emails, fechas de revisiones) que permiten almacenar y contactar a las empresas.

## Stack tecnológico

- **Frontend**: Vue.js (HTML, CSS y TypeScript)
- **Backend**: Spring Boot (Java)
- **Base de datos**: MariaDB (SQL)
- **Contenedores**: Docker

## Instalación y Configuración

### 1. Clona el repositorio

```bash
git clone https://github.com/rexwithluv/naga-fct.git
cd naga-fct
```

### 2. Configurar variables de entorno

El repositorio tiene un archivo `env.example` que contiene las variables de entorno que usan los distintos contenedores y servicios. Copia el archivos y renómbralo a `.env` para poder desplegar la aplicación.

#### Pasos

1. Copia y edita el archivo

```bash
cp .env.example .env
code .env
```

2. Levanta los servicios con docker

```bash
docker compose --profile prod up -d --build
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
└── README.md              # Este archivo!
```

## Uso

### 1. Acceso al Frontend - Vue.js

Después de levantar los contenedores con Docker Compose, puedes acceder a la interfaz de usuario del frontend en:

[http://localhost:6321](http://localhost:6321)

### 2. Acceso al Backend - Spring Boot

La API de Spring Boot estará disponible en:

[http://localhost:9000](http://localhost:9000)

### 3. Acceso a la Base de Datos (MariaDB)

Para no dejar la base de datos por error en algún estado incosistente, solo se puede manipular la información mediante peticiones a la API o mediante la interfaz web cuando se despliega en producción.

## Licencia

Este proyecto está bajo la licencia [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html). Consulta el archivo [LICENSE](./LICENSE) para más detalles.
