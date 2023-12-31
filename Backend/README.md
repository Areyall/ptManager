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

        9.3 Wrong HTTP request / Error HTTP / Wrong credentials
                errorMiddlevare -> errorHandlerMiddleware
              return thunkApi.rejectWithValue(error.message);

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
        this.password
        return  await bcrypt.compare(userPassword, this.password);
        // select: false option for the password, have a few options:
        // Remove the select: false option from the password
        // Use the select('+password')

## 11 Proxy
        cors setup -> npm i cors // 5 years old 


## 12 frontend VERBS

## 13 Authenfication and verification user

        cookie-parser package is a middleware for Express.js that parses cookies from incoming requests and makes them available in the req.cookies object -> 
        npm install cookie-parser  -> 
                const cookieParser = require('cookie-parser');
                const app = express();


         The middleware is responsible for verifying and authenticating the user based on the provided token. -> authMiddleware.js -> const authMiddleware = require('path-to-auth-middleware'); =>
                router.get('/protected', authMiddleware, (req, res) => {
                // User is authenticated, handle the request
                res.json({ message: 'Protected route accessed' });
                });

                1.User enters their login credentials (username and password) on the login page and submits the form.
                2.On the backend, the server validates the credentials and generates a JWT token.
                3.The server sends the generated token back to the client as part of the login response.
                4.On the client side, the token is received and stored in local storage:
                5.After storing the token, the user is redirected to a protected route or any other necessary logic.
                6.In subsequent requests, the token can be included in the Authorization header for authentication:
                7. On the server side, middleware can be implemented to verify and decode the token, allowing access to protected routes only for authenticated users.
        // or
        Just use NextAuth

        CORS and cookie edgecase

        Protected route -> authorized !? redirect

## 14 Frontend Dashboard UI

## 15 Protected routes

        Protection is middlevare -> 
                authMiddlevare = (req, res, next) =>{
                        logic
                        next()
                } ->
                        router.route('/editOrSomething').get/put(authMiddlevare,edit);

        couple ways to protect routes
        + localy at routes/uRoute
        + globaly app.use('url/, authMiddle, uRoute)
                trying global approach
                
                // -> its name of the token/cookie since setup

                const verify = jwt.decode(tokenPmMan, process.env.JWT_SECRET);
                req.user = await User.findById(verify.id);

        2 approaches to update user data :
                + const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
                        new: true,
                        ...some other options
                        });
                +const user = await User.findById(req.user.id);
                        user.email = email;
                        ... some other fields
                        await user.save();

         approach 1 performs the update in a single database operation, while approach 2 involves retrieving the user first, modifying the properties, and then saving the changes separately. Approach 1 may be more efficient and concise, especially if you have additional fields or complex validation logic.

         optimizations or/and modifications:
         +      Validation       library like "Joi"
         +      Separate Update and Save:  skips the retrieval of the user object.
                        await User.updateOne({ _id: req.user.id }, { $set: { email, username } });
                        const user = await User.findById(req.user.id);
        +       Selective Field Updates: additional fields object and you only want to update specific fields
                const { email, username } = newUserData;
                await User.findByIdAndUpdate(req.user.id, { email, username }, { new: true, runValidators: true });
                const user = await User.findById(req.user.id);
        + Error Handling:
                try{ logic }
                 catch (error) {
                        // Handle error
                        console.error(error);
                        res.status(500).json({ error: 'Server Error' });}
                                
## 16 Job logic
        + model: jobSchema
                company, position,status,type,location,date,comment
                
        + controller:
                logic on Route, find with mongoose in database
                
## 18 Frontend single job

## 20 frontend Stats

## 21 Stats page setup
        1 Mongoose Aggregate pipeline, way to perform complex data aggregation and transformation. Define a pipeline of stages that specify varios operations TO BE PERFORMED on data
                1. Define a pipeline stages. Each stage, an operation to be performed on data ($match, $group, $project $sort, $limit, $skip etc.)

        2 Build pipeline use: Model.aggregate()
        3 Initiate aggregate use .exec() returns promise so can use then() or await

                // Define the aggregation pipeline stages
                        const pipeline = [
                        {$match: { age: { $gte: 18 } },}, // Match documents where age is greater than or equal to 18 
                        { $group: { _id: '$gender', // Group by gender field
                        `count`: { $sum: 1 }, },}, // Count the number of documents in each group
                        {$sort: { count: -1 },},]; // Sort the groups by count in descending order

                const aggregation = User.aggregate(pipeline);
                // Execute the aggregation
                aggregation.exec().then((results) => {console.log(results); })// Handle the aggregated results

                {$group: {
                _id: '$jobStatus',   // Grouping key: Group documents by their `jobStatus` values
                count: { $sum: 1 },},}  // Calculate the count of documents in each group 
                
                        + In the $group stage, the _id field specifies the grouping key, grouped based on their jobStatus values.
                        + $sum operator is a special operator ->  increment the `count` field

        19.2 New aggregate `By date`
                on the same route

                const monthlyApplicationsPipe = [
                        // Stage 1: Match documents based on createdBy field
                        { $match: { createdBy: String(createdBy) }, },
                        // Stage 2: Group documents by year and month of createdAt field
                        { $group: {
                        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, 
                                -> `It uses the $year and $month operators`
                        
                        count: {
                                $sum: 1, },}, }, ];

        19.3 Maping sorted elements to perform date data


## 22 Front Charts

## 23 Search Querys on route
        the mainElementQuery asighnment -> 
                 if (jobStatus !== 'all') { mainELement.status = jobStatus; } ->
                 //Improved
                  if (jobStatus && jobStatus !== 'all') {
                        mainELement.status = jobStatus;
                        }
        Tips:
        + Design the API endpoint:
                /api/products/search
        + Use query parameters, search parameters and sorting options:
                use parameters like q for the search query and sort for specifying the sorting criteria
        + Validate Input, query parameters to ensure the data is safe and consistent
                library like Joi or Express Validator to validate and sanitize the incoming data
        + Implement search logic
        + Implement sorting logic
        + Pagination:

                23.1 When working with query parameters:
                        + Accessing query parameters: request object (req.query). For example, req.query.jobStatus
                        + Filtering based on the query parameters: construct the query based on the provided parameters
                        + Handling default values: const { jobStatus = 'all', jobType = 'all' } = req.query;

                        23.1.1 Object Oriented approach -> oopFiltering / quering.js

## 24 frnot inputs

## 26 Pagination 
        mongoose limit = 2, skip = 1
        +  Mongoose provides the skip() and limit() methods to handle pagination.
        + Calculate the skip value based on the current page and page size
                const numOfPages = Math.ceil(totalJobs / limit);
        
        + Route /job?page=${newPage}
                link setup to navigate pages and sort 
                rigt amount reducers to sync the logic

                        the reducers that dispatch page to glodal store with a single number
                update total jobs inialy and after sorting 

## 27 Setup demo user 
        bind button to login request
        upload dummy DB data
                https://www.mockaroo.com/schemas/543603


## 28 


