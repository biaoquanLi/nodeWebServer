var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs')
var cookieParser = require('cookie-parser');
const session = require('express-session')
const redisStore = require('connect-redis')(session)
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

if (process.env.NODE_ENV === 'dev') { //开发环境
    app.use(logger('dev'));
} else {
    const fileName = path.join(__dirname, 'logs', 'access.log')
    const writeStream = fs.createWriteStream(fileName, {
        flags: 'a'
    })
    app.use(logger('combined', {
        stream: writeStream
    }));
}


app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

const redisClient = require('./db/redis')
const sessionStore = new redisStore({
    client: redisClient
})
app.use(session({
    secret: 'libiaoquan',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore
}))
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;