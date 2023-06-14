const express = require('express');
const path= require('path');
const morgan= require('morgan');
const mysql=require('mysql');
const myConnection=require('express-myconnection');
const app =express();
//importing routes
const customerRoutes= require('./routes/customer');
const { urlencoded } = require('body-parser');

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views',path.join (__dirname,'views'));

//middleware
app.use(morgan('dev'));
app.use(myConnection(mysql,{
    host:'localhost',
    user:'root',
    password:'',
    port: 3308,
    database:'crudnodejsmysql'
},'single'))
app.use(express.urlencoded({extended: false}));
//routes
app.use('/', customerRoutes);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//starting server
app.listen(app.get('port'),()=>
console.log('Server on port 3000')
);