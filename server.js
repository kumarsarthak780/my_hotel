const express= require('express');
const app= express();
const db = require('./db'); 

const Person= require("./models/person.js")
const Menu= require("./models/menu.js")


const bodyparser= require('body-parser')
app.use(bodyparser.json());




app.listen(9000, ()=>{
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