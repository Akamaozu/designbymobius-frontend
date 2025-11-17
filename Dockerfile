# Use an existing image as a base
FROM node:24

# set default values
ARG NODE_VERSION=24
ARG PORT=3001
ARG WORKDIR_PATH=/usr/app
ARG ENV_NAME=production

# use specified values, if any
ENV PORT=${PORT}
ENV ENV_NAME=${ENV_NAME}

# set workdir
WORKDIR ${WORKDIR_PATH}

# Copy source code
COPY ./package-lock.json ./package-lock.json
COPY ./package.json ./package.json
COPY ./public ./public
COPY ./server ./server
COPY ./utils ./utils
COPY ./src ./src
COPY ./entrypoint.js ./entrypoint.js

# Install the dependencies
RUN apt-get -y update && apt-get -y install ghostscript
RUN npm i

# Expose the port that the app listens on
EXPOSE ${PORT}

# Run the app
CMD ["node", "entrypoint.js"]
