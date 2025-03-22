# Usamos la imagen oficial de maven
FROM maven:latest AS build
WORKDIR /app

# Copiamos el pom.xml
COPY pom.xml .

# Descargamos las dependencias
RUN mvn dependency:go-offline

# Copiamos el resto del proyecto
COPY src .

# Generamos el .jar
RUN mvn clean package -DskipTests

# La imagen oficial de JDK está obsoleta
FROM eclipse-temurin:21
WORKDIR /app

# Copiamos el .jar generado en la imagen con JDK
COPY --from=build /app/target/*.jar app.jar

# Ejecutamos el proyecto
CMD ["java", "-jar", "/app/app.jar"]
