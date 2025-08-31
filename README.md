# NAGA-FCT

**NAGA-FCT** (abreviado simplemente como ***NAGA***, *Núcleo o Nexo de Administración y Gestión del Alumnado en FCT*) es un proyecto que **permite a los docentes tener en una única aplicación todo lo necesario para administrar y gestionar las FCT** del alumnado de Ciclos Formativos.

NAGA nace a partir de la necesidad del profesorado por tener una plataforma que enlace y centralice las demás aplicaciónes (consulta del alumnado, envío de emails, fechas de revisiones) que permiten almacenar y contactar a las empresas.

## Stack tecnológico

- **Frontend**: Vue.js (HTML, CSS y TypeScript)
- **Backend**: Spring Boot (Java)
- **Base de datos**: MariaDB (SQL)
- **Despliegue**: Docker y Kubernetes

## Puesta en marcha

### Desarrollo

1. Clona el repositorio

    ```bash
    git clone https://github.com/rexwithluv/naga-fct.git
    cd naga-fct
    ```

2. Configura variables de entorno

    ```bash
    cp .env.example .env
    nano .env
    ```

3. Ejecuta el comando para que Docker levante los contenedores

    ```bash
    docker compose up -d --build
    ```

Una vez que los contenedores estén listos, puedes acceder a las aplicaciones en las siguientes URLs:

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:9000](http://localhost:9000)

La base de datos **no** es accesible directamente desde tu navegador.

### Producción

1. Clona el repositorio

    ```bash
    git clone https://github.com/rexwithluv/naga-fct.git
    cd naga-fct
    ```

2. Configura los secretos y el dominio donde será desplegada

    ```bash
    cd k8s/

    # Secretos o variables de entorno
    cp secrets.example.yaml secrets.yaml
    nano secrets.yaml

    # Tu dominio y subdominios
    nano ingress.yaml
    ```

3. Crea un namespace dedicado si lo consideras y aplica los archivos

    ```bash
    kubectl create namespace naga-fct
    kubectl apply -f k8s -n naga-fct
    ```

Una vez que el despliegue se haya completado, podrás acceder a las aplicaciones a través de tu dominio:

- **Frontend**: `https://tudominio.xyz/naga-fct`
- **Backend API**: `https://tudominio.xyz/api/naga-fct`

La base de datos **no** es accesible directamente desde tu navegador.

## Estructura del Proyecto

``` md
├── backend/
├── db/
│   ├── database.dbml      # .dbml de la estructura base de la DB
│   ├── schema.sql         # Estructura base de la DB
│   └── seed.sql           # Datos de prueba para la DB
├── dev/                   # Archivos útiles durante el desarrollo
├── docs/
│   ├── MER.png            # Modelo Entidad-Relación de la DB
│   ├── MR.png             # Modelo relacional de la DB
│   ├── postman.json       # Colección JSON para Postman
│   ├── QyA.md             # Decisiones tomadas durante el desarrollo
│   └── UMLClases.png      # Diagrama UML de clases sobre el backend
├── frontend/              # Directorio con el código del frontend
├── .env                   # Variables de entorno de desarrollo
├── docker-compose.yml     # Orquestación de contenedores de desarrollo
└── README.md              # Este archivo!
```

## Licencia

Este proyecto está bajo la licencia [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html). Consulta el archivo [LICENSE](./LICENSE) para más detalles.
