## Productivity Manager Server Logs


    

### 7) Setup Server

        npm init --yes
        npm install express
        npm i -D nodemon
        npm i dotenv
        npm i mongodb
        npm i mongoose
        npm i cors

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