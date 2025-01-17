const express= require('express');
const app= express();
const db = require('./db'); 
require('dotenv').config();

const Person= require("./models/person.js")
const Menu= require("./models/menu.js")


const bodyparser= require('body-parser')
app.use(bodyparser.json());



const PORT= process.env.PORT || 9000;
app.listen(PORT, ()=>{
    console.log('Server is running on port 9000')
});

app.get('/', (req, res)=>{
    res.send('Welcome to my hotel')
})



//Routing
const personRoutes= require('./routes/personRoutes.js');
app.use('/person', personRoutes);

const menuItemRoutes= require('./routes/menuItemRoutes.js');
app.use('/menu', menuItemRoutes);