# Need a custom image here so that we can incorporate an npm build too
# Alpine is super light
FROM alpine:3.5

# Download and install packages
RUN apk add -U nginx make nodejs

# Create directories
#   /working is the build directory
#   /static is the directory linked to nginx (serves static content)
RUN mkdir -p /var/www/pickmybruin/working && \
    mkdir -p /var/www/pickmybruin/static && \
    mkdir -p /var/www/pickmybruin/static/build && \
    mkdir -p /var/www/pickmybruin/static/images && \
    mkdir -p /var/www/pickmybruin/static/fonts

# Install the required packages to build the frontend
WORKDIR /var/www/pickmybruin/working
COPY *.json /var/www/pickmybruin/working/
RUN /usr/bin/node --max_semi_space_size=8 \
                  --max_old_space_size=298 \
                  --max_executable_size=248 \
                  /usr/bin/npm install

# Copy the source files
COPY pages/ /var/www/pickmybruin/working/pages/
COPY src/ /var/www/pickmybruin/working/src/
COPY images/ /var/www/pickmybruin/working/images/
COPY fonts/ /var/www/pickmybruin/working/fonts/
COPY .babelrc *.js Makefile /var/www/pickmybruin/working/

# build and copy files to server root
RUN make build && \
    cp -rv pages/* ../static/ && \
    cp -rv lib/build/* ../static/build/ && \
    cp -rv lib/images/* ../static/images/ && \
    cp -rv lib/fonts/* ../static/fonts/

# Copy the configuration file
RUN mkdir -p /run/nginx
COPY nginx.conf /etc/nginx/
WORKDIR /var/www/pickmybruin/static

# Run the server
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
