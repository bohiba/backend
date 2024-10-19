const express  = require(`express`);
const UserRouter = require(`./routes/user_router`);
const session = require(`express-session`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const VehicleRouter = require("./routes/vehicle_router");
const upload = multer();

const app = express();
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false}
    })
);
// for parsing Content-Type = application/json
app.use(bodyParser.json());
// for parsing Content-Type = application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(upload.array());

app.use('/', UserRouter);

app.use('/api/v1/', VehicleRouter);

module.exports = app;