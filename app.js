const express  = require(`express`);
const multer = require(`multer`);
const session = require(`express-session`);
const upload = multer();

const bodyParser = require(`body-parser`);
const AuthRouter = require("./routes/auth_route");
const MinesRouter = require("./routes/mines_route");
const UserRouter = require("./routes/user_route");

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

app.use("/api/v1/", AuthRouter);
app.use("/api/v1/", MinesRouter);
app.use(`/api/v1/`, UserRouter);

module.exports = app;