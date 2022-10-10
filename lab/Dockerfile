FROM node:12


# setting work directory
WORKDIR /usr/src/app
COPY . .
# running npm
RUN npm install

# exposing port 80
EXPOSE 80

# running app.js with node
CMD [ "node", "app.js" ]
