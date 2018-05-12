# Need a custom image here so that we can incorporate an npm build too
# Alpine is super light
FROM alpine:3.5

# Download and install packages
RUN apk add -U nginx make nodejs

# Create directories
#   /working is the build directory
#   /static is the directory linked to nginx (serves static content)
RUN mkdir -p /var/www/BQuest/working && \
    mkdir -p /var/www/BQuest/static && \
    mkdir -p /var/www/BQuest/static/build && \
    mkdir -p /var/www/BQuest/static/images

# Install the required packages to build the frontend
WORKDIR /var/www/BQuest/working
COPY *.json /var/www/BQuest/working/
RUN /usr/bin/node --max_semi_space_size=8 \
                  --max_old_space_size=298 \
                  --max_executable_size=248 \
                  /usr/bin/npm install

# Copy the source files
COPY pages/ /var/www/BQuest/working/pages/
COPY src/ /var/www/BQuest/working/src/
COPY images/ /var/www/BQuest/working/images/
COPY .babelrc *.js Makefile /var/www/BQuest/working/

# build and copy files to server root
RUN make build && \
    cp -rv pages/* ../static/ && \
    cp -rv lib/build/* ../static/build/ && \
    cp -rv lib/images/* ../static/images/

# Copy the configuration file
RUN mkdir -p /run/nginx
COPY nginx.conf /etc/nginx/
WORKDIR /var/www/BQuest/static

# Run the server
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
