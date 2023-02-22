# API Photo app
This app is for those who love photos and wants to uppload it. 

The user have to create an acount and login, then the user can add album and photos and make some comments

### Technologies
  Node js express
  Prisma
  TypeScript
  mySql

## Install and Run the Project
  You need to have install node.js:
  https://nodejs.org/en/

I'm using npm (Node Package Manager):
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### Install dependencies
  npm install

### .env-file
  Create your own .env file, write your connection the 
  database: 
  username, password and port number and databas name prisma_photo_app 

  And Port and Tokens
  PORT=3000
  SALT_ROUNDS=
  ACCESS_TOKEN_SECRET=
  ACCESS_TOKEN_LIFETIME=
  REFRESH_TOKEN_SECRET=
  REFRESH_TOKEN_LIFETIME=

and then place it in the server folder:
.env 


# Coonnection string example
  DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/prisma_photo_app"


### Run the Project
npm run dev


# Deployed site
  https://smoggy-lime-wildebeest.cyclic.app


That is it! 
Have fun!
