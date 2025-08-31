# Usamos la imagen oficial de maven
FROM maven:latest AS build

WORKDIR /app

# Copiamos el proyecto
COPY . .

# Descargamos las dependencias y construimos
RUN mvn clean package -DskipTests --quiet --no-transfer-progress

# La imagen oficial de JDK está obsoleta
FROM eclipse-temurin:21

WORKDIR /app

LABEL org.opencontainers.image.source="https://github.com/rexwithluv/naga-fct"

# Copiamos el .jar generado en la imagen con JDK
COPY --from=build /app/target/*.jar /app/app.jar

# Ejecutamos el proyecto
CMD ["java", "-jar", "/app/app.jar"]
