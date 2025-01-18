const express= require('express');
const app= express();
const db = require('./db'); 
require('dotenv').config();
const passport= require('passport')
const LocalStrategy= require('passport-local').Strategy;
const Person= require("./models/person.js")
const Menu= require("./models/menu.js")


const bodyparser= require('body-parser')
app.use(bodyparser.json());
app.use(passport.initialize());




//Middleware Function

passport.use(new LocalStrategy(async (USERNAME, password, done)=>{
    try{
        console.log('Received credentials', USERNAME, password);
        const user= await Person.findOne({username: USERNAME});
        if(!user){
            return done(null, false, {message: 'Incorrect username'});
        }
        const isPasswordMatch= user.password== password?true: false;
        if(isPasswordMatch){
            return done(null, user);

        }
        else{
            return done(null, false, {message: 'Incorrect Password'})
        }
    }
    catch(err){

    }
}))

const logRequest= (req, res, next)=>{
    console.log(`${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`);
    next();
}

const PORT= process.env.PORT || 9000;
app.listen(9000, ()=>{
    console.log('Server is running on port 9000')
});
app.use(logRequest);
app.get('/', function (req, res){
    res.send('Welcome to my hotel')
})



//Routing
const personRoutes= require('./routes/personRoutes.js');
app.use('/person', personRoutes);

const menuItemRoutes= require('./routes/menuItemRoutes.js');
app.use('/menu', menuItemRoutes);