require('dotenv').config();
const express = require('express');
const wrongRoute = require('./middleware/wrongRoure');
const errorHandlerMiddleware = require('./middleware/ErrorHandler');

const app = express();

app.get('/api/v1', (req, res) => {
  res.send('It`s working');
});

app.use(wrongRoute);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server up at port ${port}`));
