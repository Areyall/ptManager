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

                        
## 8 DataBase models
        - schema
        - username, email, password

                const mongoose = require('mongoose');
                const { Schema } = mongoose;

                const UserSchema = new Schema({
                username: {
                type: String,
                },
                email: {same},
                password: {same},
                });

                const User = mongoose.model('User', UserSchema);
                module.exports = User;  

        
        8.1 Register user:
        - Controller POST verb -> According to the mongoose user Model
                const userData = await User.create(req.body)
                        
        8.2 try catch error handling
                using next inside handler catch 
                        next(error) -> which is IF error occurse passed to middleware that handles errors

        npm package -> ExpressJS Async Errors -> handle async
                npm i express-async-errors // posible prevent crashes

        8.3 Status code

        Optional (200kb)       Constants enumerating the HTTP status codes ->
                 npm i http-status-codes 


## 9 Error handling (vast majority registry check)
                - A dead simple ES6 async/await support hack for express-async-errors
                Optional:
                -  Boom = require('@hapi/boom'); 
                -  createError = require('http-errors');

                Advanced:
                - Centralized Error Handling Middleware:
                - Custom Error Classes:
                - Centralized Error Handling Middleware:
                - Async Error Wrapping:
                - Handling Errors in Async Functions: Use try/catch
                - Responding with Error Objects:

                Edges:
                - Database Errors:
                - File Upload Errors:
                - Validation Errors:
                - File Upload Errors:

                UX/UI:


                - conditionals at error middlevare
                - database fields doublecheck, rephrase requirements
                - conditional error in plase if !value

                / display errors UI, by specific obj.field /

        9.1 Extend Error class
                class CustomAPIerror extends Error ->

        9.2 Error folder 
                - use index.js at this folder

## 10 Crypting and hashing
                // bcrypt ->  library to help hash the passwords.
                npm i bcrypt

                - genSalt, hash, compare 

        ++ (mongoDB) mongoose middlevare .pre -> are executed one after another, when each middleware calls next 
                // Or, in Node.js >= 7.6.0:
                        schema.pre('save', async function() {
                        await doStuff();
                        await doMoreStuff();
                        });

                10.1 JWT
                jwt.sign(payload, secretOrPrivateKey, [options, callback])
                npm i jsonwebtoken

                mongoose Instance methods 
               // Return JWT token
                userSchema.methods.getJwtToken = function () {
                return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_TIME
                });
                }

                + userSchema.methods.getJwtToken/comparePassword -> now available at all userSchema

                const token = User.getJwtToken();
                res.status(201).json({ userData, token });

                -- new approach
                 - in model password use  select: false
                 - to hide password in retuen use ->  .json({
                user: { username: userData.username, email: userData.email },
                token,
                });

        + COmpare passwords:

## 11 Proxy
        cors setup -> npm i cors // 5 years old 


## 12 frontend VERBS






