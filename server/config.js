const path = require('path');
require('express-handlebars');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const multer = require('multer');
const express= require('express');
const errorHandler = require('errorhandler');

const routes = require('../routes/index');

module.exports = app => {
    

    app.set('port', process.env.PORT || 4000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.handlebars', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname:'.handlebars',
        helpers: require('./helpers')
    }));

    app.set('view engine', '.handlebars');

    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    app.use('/public', express.static(path.join(__dirname, './public')));
    
    routes(app)

    if ('development' === app.get('env')){
        app.use(errorHandler);
    }

    return app;
}