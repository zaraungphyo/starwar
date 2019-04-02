const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');
//  multer = require('multer'),
//  upload = multer({ storage: storage });


const businessRoute = require('./routes/product.route');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);

const app = express();
//app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/v1/products', businessRoute);
//const port = process.env.PORT || 4000;
const port = 4000;

const server = app.listen(port, function() {
    console.log('Listening on port ' + port);
});