import express from 'express';
import cors from 'cors';
// import logger from 'volleyball';
import bodyParser from 'body-parser';
import validation from 'express-validator';

import routecontroller from './route';

const app = express();

// app.use(logger);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).json({
    status: 'Success',
    message: 'Welcome to Fast-Food-Fast, a platform to order for food',
}));

app.use(express.static('public'));
app.use(validation());

app.use(routecontroller);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Fast-Food-Fast is listening on ${PORT}`));


export default app;