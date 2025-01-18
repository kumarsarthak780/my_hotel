const passport= require('passport')
const LocalStrategy= require('passport-local').Strategy;
const Person= require("./models/person.js")

passport.use(new LocalStrategy(async (USERNAME, password, done)=>{
    try{
        console.log("Received Credentials", USERNAME, password);
        const user= await Person.findOne({username: USERNAME});

        if(!user){
            console.log('Incorrect username');
            return done(null, false, {message: 'Incorrect usrname'});
        }

        //const isPasswordMatch=  user.password==password?true:false;
        const isPasswordMatch= await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null, user);
        }
        else{
            return done(null, false, {message: 'Incorrect password'});
        }
    }
    catch(err){
        return done(err);
    }
}))

module.exports= passport;