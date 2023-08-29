# Use the official Nginx base image
FROM nginx

# Install Certbot and necessary dependencies
RUN apt-get update && \
    apt-get install -y certbot python3-certbot-nginx

# Delete the default welcome to nginx page.
RUN rm /usr/share/nginx/html/*

# Copy over the custom default configs.
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Copy the Certbot renewal script into the container
COPY ./renew-certs.sh /renew-certs.sh
RUN chmod +x /renew-certs.sh

# Start Certbot and Nginx in the foreground using the script
CMD ["/renew-certs.sh"]
