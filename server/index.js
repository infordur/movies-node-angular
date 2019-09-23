import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
//const db = require('./models/index');
import db from './models';
import router from './routes';
//import path from 'path';
//const cookieParser = require('cookie-parser');

config.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());


// Add Routes
app.use(router);

const port = process.env.PORT || 3000;


db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`APP listening on port ${port}`)
    });
});