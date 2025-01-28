FROM node:22 AS build
WORKDIR /app

# Copiamos los archivos e instalamos los módulos
COPY package*.json /app
RUN npm install

# Copiamos el resto de archivos y construimos la aplicación en /dist
COPY . .
RUN npm run build

# Para servir los archivos usamos nginx
FROM nginx:alpine

# Copiamos los archivos construidos en la carpeta de nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 6321
CMD [ "nginx", "-g", "daemon off;" ]