//Puntos de acceso o EndPoints, peticiones http, post y get, asi como middlewares
const express = require ('express');
const mysql = require ('mysql2');
const bodyPaser = require('body-parser');

//Intanciar
const app = express();
//Puerto
const port = 3008;

app.use(bodyPaser.urlencoded({extend:false}));
//analizar los datos del cuerpo de las solicitudes HTTP

//Motor de plantillas para html de forma dinamica
app.set('view engine', 'ejs');

//Apartir de mysql creamos una conexion
//Credenciales para DB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'node_crud',
    port: '3306'    //3307?
});

//Conexion a la DB

db.connect(err=>{
    if(err){
        console.log(`Error al momento de hacer conexion DB: ${err}`);
    }else{
        console.log(`Conexion realizada :)`);
    }
});

//Server inicio     cloud IA
app.listen(port, ()=>{
    console.log(`El sever esta en escucha desde http://localhost:${port}`);
});

//Mostrar lista de usuarios

app.get('/',(req,res)=>{
    //Consulta a la BD
    const query = 'SELECT * FROM user';
    //Trabajar conexion
    db.query(query,(err, results) => {
        if(err){
            //MEnsaje de error para el usuario
            console.error(`Error al recuperar datos: ${err}`);
            res.send('Error en recuperar datos');
        }else{
            res.render('index', {users:results});
        } 
    });
});

//Agregar ususario
//ID Nombre Email Acciones

app.post('/add',(req,res)=>{
    const {name,email} = req.body;
    const query = 'INSERT INTO users (name, email) VALUE (?,?)';
    db.query(query,[name,email],(err)=>{
        if(err){
            console.error(`Error al insertar en users: Codigo -> ${err}`);
            res.send('Error');
        }else{
            res.redirect('/');
        }
    });
});
