# Usamos la imagen oficial de maven
FROM maven:latest AS build
WORKDIR /app

# Copiamos el pom.xml
COPY pom.xml .

# Descargamos las dependencias
RUN mvn verify -DskipTests

# Copiamos el resto del proyecto
COPY . .

# Generamos el .jar
RUN mvn clean package -DskipTests

# La imagen oficial de JDK está obsoleta
FROM eclipse-temurin:21

WORKDIR /app

LABEL org.opencontainers.image.source="https://github.com/rexwithluv/naga-fct"

# Copiamos el .jar generado en la imagen con JDK
COPY --from=build /app/target/*.jar /app/app.jar

# Ejecutamos el proyecto
CMD ["java", "-jar", "/app/app.jar"]
