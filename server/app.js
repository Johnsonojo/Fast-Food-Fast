// importing express and other modules
import express from 'express';
// import logger from 'volleyball';
import bodyParser from 'body-parser';
import validation from 'express-validator';

// importing the routes
import routecontroller from './dummyApi/route/index';

// Setup the express app
const app = express();

// Log requests to the console.
// app.use(logger);

// body-parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => res.status(200).json({
//     status: 'success',
//     message: 'Welcome to Fast-Food-Fast, a platform to order for food',
// }));


app.use(validation());

// configuring the app to use the eoute
app.use(routecontroller);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Fast-Food-Fast is listening on ${PORT}`));

export default app;