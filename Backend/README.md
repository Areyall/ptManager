## Productivity Manager Server Logs

### 7) Setup Server

        npm init --yes
        npm install express
        npm i -D nodemon
        npm i dotenv
        npm i mongodb
        npm i mongoose
        npm i cors

.gitignor
"dev": "nodemon server",

                require('dotenv').config()
                const express = require('express');
                const app = express();


                console.log(process.env.PORT)

                app.get('/api/v1', (req, res) => {
                res.send('It`s working');
                });

                const port = process.env.PORT || 4000;

                app.listen(port, () => console.log(`Server up at port ${port}`));


        7.1 Error middleware
                app.use

                module.exports = wrongRoute;
                const wrongRoute = require('./middleware/wrongRoure');
                app.use(wrongRoute);

        - error handle
        - log error
        - showcase asynk errors

        7.2 Connect to database
                - mongoose
                - env -> MONGODB_URI

                const mongoose = require('mongoose');
                mongoose.connect(process.env.MONGODB_URI);
                const connection = mongoose.connection;
                connection.on('error', () => console.log('Error connecting DB'));
                connection.on('connected', () => console.log('DB connected'));
                module.exports = mongoose;

                // mongoose.connect(uri, options);
                // Or:


                try {
                await mongoose.connect(process.env.MONGODB_URI);
                } catch (error) {
                handleError(error);
                }

                        const dbConfig = require('./config/database');

## 8 Auth / Job  Routes structure

        +middleware => app.use(express.json([options])) -> This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

        // register // login // updateUser
        app.use('/api/v1/auth, authRout)
        server -> userRoutes -> userController

`x2 user & job`

             1.   const auth = require('./routes/userRoutes');
                        app.use('/api/v1/', auth); ->

               2.    './routes/userRoutes' ->   const express = require('express');
                                                const router = express.Router(); ->
                                                        
                                                        router.route('/user').post(register);
                                                        router.route('/job/createJob').post(createJob);

                 3.               exports.register = (req, res) => {
                                res.send(' register user');
                                };

                Express route chaining  (get, post, put)  corresponding callback function for VERB will be executed , and the response will be to VERB method

                2.1        router.route('/job/').post(createJob).get(getAllJobs);
                        router.route('/job/stat').get(showStatsJob);
                        router.route('/job/:id').delete(deleteJob).put(updateJob);

                        
