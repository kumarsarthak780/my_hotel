const express= require('express');
const app= express();
const db = require('./db'); 
require('dotenv').config();

const LocalStrategy= require('passport-local').Strategy;
const Person= require("./models/person.js")
const Menu= require("./models/menu.js")
const passport= require('./auth');

const bodyparser= require('body-parser')
app.use(bodyparser.json());





//Middleware Function


const logRequest= (req, res, next)=>{
    console.log(`${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`);
    next();
}

const PORT= process.env.PORT || 9000;
app.listen(9000, ()=>{
    console.log('Server is running on port 9000')
});
app.use(logRequest);


app.use(passport.initialize());
const localAuthMiddleware= passport.authenticate('local', {session: false});
app.get('/',  function (req, res){
    res.send('Welcome to my hotel')
})



//Routing
const personRoutes= require('./routes/personRoutes.js');
app.use('/person', personRoutes);

const menuItemRoutes= require('./routes/menuItemRoutes.js');
app.use('/menu', menuItemRoutes);