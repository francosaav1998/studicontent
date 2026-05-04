# Usamos una imagen oficial y súper ligera de Nginx para servir estáticos
FROM nginx:alpine

# Copiamos todos los archivos del directorio actual al directorio de Nginx
COPY . /usr/share/nginx/html/

# Exponemos el puerto 80 para tráfico web
EXPOSE 80

# Mantenemos Nginx ejecutándose en primer plano
CMD ["nginx", "-g", "daemon off;"]
