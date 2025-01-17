const mongoose= require("mongoose");
require('dotenv').config();

//const mongoURL= "mongodb://localhost:27017/hotel"
//const mongoURL= "mongodb+srv://happy:sarthak123@cluster0.msmnz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const mongoURL= process.env.mongo_URL;
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db= mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected to database');
})

db.on('error', (err)=>{
    console.log('MongoDB connection error', err)
})

db.on('disconnected', ()=>{
    console.log('MongoDB disconnected');
})

module.exports= {db}