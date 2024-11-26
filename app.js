//Puntos de acceso o EndPoints, peticiones http, post y get, asi como middlewares
const express = require('express');
const mysql = require('mysql2');
const bodyPaser = require('body-parser');
const path = require('path');

//Intanciar
const app = express();
//Puerto
const port = 3020;
const hostName = 'localhost';

app.use(bodyPaser.urlencoded({ extended: false }));
//analizar los datos del cuerpo de las solicitudes HTTP
app.use(express.static(path.join(__dirname, 'public')));
//Motor de plantillas para html de forma dinamica
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//Apartir de mysql creamos una conexion
//Credenciales para DB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'node_crud',
    port: '3306'
});

//Conexion a la DB

db.connect(err => {
    if (err) {
        console.log(`Error al momento de hacer conexion DB: ${err}`);
    } else {
        console.log(`Conexion realizada :)`);
    }
});

//Server inicio     cloud IA
app.listen(port, hostName, () => {
    console.log(`El sever esta en escucha desde http://${hostName}:${port}`);
});

//Mostrar lista de usuarios

app.get('/', (req, res) => {
    //Consulta a la BD
    const query = 'SELECT * FROM users';
    //Trabajar conexion
    db.query(query, (err, results) => {
        if (err) {
            //MEnsaje de error para el usuario
            console.error(`Error al recuperar datos: ${err}`);
            res.send('Error en recuperar datos');
        } else {
            res.render('index', { users: results });
        }
    });
});

//Agregar ususario
//ID Nombre Email Acciones
app.get('/agregar', (req, res) => {
    res.render('agregar');
});

app.post('/add', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO users (name, email) VALUE (?,?)';
    db.query(query, [name, email], (err) => {
        if (err) {
            console.error(`Error al insertar en users: Codigo -> ${err}`);
            res.send('Error');
        } else {
            res.redirect('/');
        }
    });
});

//Editar ususario
app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error en la DB');
            res.send("Error en la DB");
        } else {
            res.render('edit', { user: results[0] }); //Lo ideal seria mandar un res.sendfile
        }
    });
});

app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    db.query(query, [name, email, id], (err) => {
        if (err) {
            console.error(`Error al actualizar el usuario: ${err}`);
            res.send('Error al actualizar');
        } else {
            res.redirect('/');
        }
    });
});

//Eliminar 
app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?'
    db.query(query, [id], (err) => {
        if (err) {
            console.error('error en el delerte');
            res.send("Error al eliminar");
        } else {
            res.redirect('/');
        }
    });
});