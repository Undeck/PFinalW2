//Puntos de acceso o EndPoints, peticiones http, post y get, asi como middlewares
const express = require ('express');
const mysql = require ('mysql2');
const bodyPaser = require('body-parser');

const app = express();
app.use(bodyPaser.urlencoded({extend:false}));

