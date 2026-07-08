FROM nginx:1.29-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy website
COPY . /usr/share/nginx/html/

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]