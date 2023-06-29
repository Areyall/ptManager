require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('express-async-errors');
const wrongRoute = require('./middleware/wrongRoure');
const errorHandlerMiddleware = require('./middleware/ErrorHandler');

const app = express();
const dbConfig = require('./config/database');

app.get('/api/v1', (req, res) => {
  res.send('It`s working');
});
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());

//routes
const auth = require('./routes/userRoutes');
const job = require('./routes/jobRoutes');

app.use('/api/v1', auth);
app.use('/api/v1', job);

//error middlewares
app.use(wrongRoute);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server up at port ${port}`));
