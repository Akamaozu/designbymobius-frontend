# Use an existing image as a base
FROM node:24

# set default values
ARG NODE_VERSION=24
ARG PORT=3001

# use specified values, if any
ENV PORT=${PORT}

# Install the dependencies
RUN npm install
RUN apt-get -y update && apt-get -y install ghostscript

# Copy the rest of the code
COPY . .

# Expose the port that the app listens on
EXPOSE ${PORT}

# Run the app
CMD ["npm", "run", "start:prod"]
