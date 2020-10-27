# Fullstack Engineering Practical
<img src="https://github.com/gispatial/fullstack-engineer-practical/blob/master/setel.png">
<img src="https://github.com/gispatial/fullstack-engineer-practical/blob/master/dashboard.png" width="100%">
## Setel-Engineering-Test-Assessment-2020 for Grade 4 Full Stack Engineer - R. Aidy
Backend build using Nest.js, TypeScript, React and MongoDB.
While application for a orders are built using ReactJS exclusively for Users to manage their orders inventory 

## Getting Started
This app is divided into two separate sections. Namely the Backend > ( Built with Nest.js & MongoDB ) and the Frontend
orders( Built with React ).

Install TypeScript globally on your machine if you don't have it installed already:

```bash
npm install -g typescript
```

### Clone the repository
To easily set up the application, clone this repository which contains directory for both sections of the project ( i.e `backend` and `orders`)

```bash
git clone https://github.com/gispatial/nest-react-mongod.git
```

## Change directory into the newly cloned project
```bash
cd backend
```

## Backend
### Change directory into the backend
```bash
cd backend
```

### Install backend dependencies

```bash
npm install
```

### Create .env file
Once the installation process is complete, create a `.env` file:

```bash
.env
```

Open the newly created file and add the following code:

```
YOUR_DOMAIN=YOUR_DOMAIN
YOUR_AUDIENCE=YOUR_AUDIENCE
```

Ensure that you replace the `YOUR_DOMAIN` and `YOUR_AUDIENCE` placeholder with the appropriate credentials as obtained from your API settings.


### MongoDB
Ensure that you have mongoDB installed on your machine before running the application. I have this fully setup on my mac already.

Start mongoDB:

```bash
sudo mongod
```

### Run the application
Open another terminal and still within the `backend` project directory run the application with:

```bash
npm run start:dev
```

This will start the backend application on port `5000`. This was modified to avoid confliction with the frontend application which by default will run on port `3000`


## Frontend
```bash
Open another terminal from the `nest-react-mongod` and navigate to the `orders` folder to setup the frontend
```

### Frontend dependencies
```bash
cd orders
npm install
```

### Run the frontend app

```bash
npm start or yarn | 
Please run $ make build 
then $ make run-demo
to deploy the frontend part of Orders Management
```

### Create .env file and include Auth0 App credentials

Create a `.env` file as shown here:

```
 .env
```

Open the file and paste the following code in it:

```
REACT_APP_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
REACT_APP_DOMAIN=YOUR_AUTH0_DOMAIN
REACT_APP_AUDIENCE=YOUR_AUTH0_AUDIENCE
REACT_APP_REDIRECT_URI=http://localhost:3000/callback
REACT_APP_BASEURL=http://localhost:3000/
```

Replace `YOUR_CLIENT_ID`, `YOUR_DOMAIN` and `YOUR_AUDIENCE` placeholder with your API credentials.

### Test the application
```bash
Finally open your browser and view the application on http://localhost:3000
```
### Testing Your Changes In Your App
```bash
Using yarn link, you can have your project use a local checkout of the react-admn package instead of npm. This allows you to test react-admin changes in your app:
```

### Register your frontend orders as a linkable package
```bash
cd /code/path/to/orders/packages/react-admin && yarn link
```
### Replace the npm-installed version with a symlink to your local version 
```bash
cd /code/path/to/myapp/ && yarn link react-admin
If you run into issues with React red-screen, then you need to register your app's version of React as a linkable package 
cd /code/path/to/myapp/node_modules/react && yarn link
And then replace the npm-installed version of React with a symlink to your app's node_modules version
cd /code/path/to/react-admin/ && yarn link react
```
### Rebuild the packages with the same version of React
```bash
cd /code/path/to/react-admin/ && make build
```

Return to your app and ensure all dependencies have resolved 
```bash
$ cd /code/path/to/myapp/ && yarn install

Start your app
yarn start
Automated Tests
Automated tests are also crucial in our development process. You can run all the tests (linting, unit and functional tests) by calling:

make test
Unit tests use jest, so you should be able to run a subset of tests, or run tests continuously on change, by passing options to

yarn jest
Besides, tests related to the modified files are ran automatically at commit using a git pre-commit hook. This means you won't be able to commit your changes if they break the tests.

When working on the end to end tests, you can leverage cypress runner by starting the simple example yourself (make run-simple or yarn run-simple) and starting cypress in another terminal (make test-e2e-local or yarn test-e2e-local).
```

## Prerequisites
 [Node.js](https://nodejs.org/en/), [Yarn package manager](https://yarnpkg.com/lang/en/docs/install/#mac-stable), [MongoDB](https://docs.mongodb.com/v3.2/installation/) and [TypeScript](https://www.typescriptlang.org/)


## Built With
```bash
Nest.js
React.js - React-Admin by Marmelab
MongoDB
```

#### This Assessment is up by R. Aidy your down to earth senior grade 4 full stack frontend engineer (Malaysian)
