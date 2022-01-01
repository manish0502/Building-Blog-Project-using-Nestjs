FROM node:12.19.0-alpine3.9 AS development
#FROM node:12


# Create app directory ,this will be the working directory inside the container
WORKDIR /usr/src/app



# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install glob rimraf

#RUN npm install
# If you are building your code for production
# RUN npm ci --only=production


# Bundle app source
COPY . .


RUN npm run build

EXPOSE 8080

#this cmd is used to run the container

CMD [ "node", "dist/main" ]




