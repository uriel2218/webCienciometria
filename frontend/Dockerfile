# Etapa 1: Construcción (Build)
FROM node:20-alpine AS build

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código fuente y construir la aplicación para producción
COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Servidor (Nginx)
FROM nginx:alpine

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos compilados de Angular desde la Etapa 1
# Nota: A partir de Angular 17+, la salida estándar suele estar dentro de 'dist/<nombre>/browser'
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

