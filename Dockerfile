# Utilizar una imagen oficial de Node.js basada en Debian como base
FROM node:14.15.4-buster-slim

# Crear un directorio para el código de la aplicación
WORKDIR /usr/src/app

# Copiar el archivo package.json y package-lock.json en el directorio de trabajo
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm ci

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["npm", "start"]
