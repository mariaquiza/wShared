//Importar Mongoose
//const mongoose = require('mongoose');
require('./config/database');
require('dotenv').config({path:'shared.env'})
const express = require('express');

const config = require('./server/config');
const MongoStore = require('connect-mongo').default;
const app = config(express());
const session = require('express-session');

app.listen(app.get('port'), () =>{

})

//Creando la sesión
app.use(session({
    secret:process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized:false,
    store: MongoStore.create({mongoUrl:process.env.DATABASE})
}));