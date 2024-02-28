const passport = require('passport');

const Localstrategy = require('passport-local').Strategy;

const User = require('/Users/sambusanthosh/Desktop/ers-main-sambu/Models/user.js');


//authenticate using passport

passport.use(new Localstrategy({
        usernameField: 'email',
        passReqToCallback: true
    },

    async function(req,email,password,done) {

        try{
            const user = await User.findOne({email: email})
            console.log("i found the user in db");

            if (!user || (password != user.password)){

                // console.log("invalid password!");
                req.flash('error', 'invalid password');

                return done(null,false);
            }

            console.log("i came till here")
            console.log(user);

            return done(null,user);
        }

        catch (err){
            // console.log('error in finding user');
            req.flash('error', 'invalid password');
            return done(err);
        }
        
        // User.findOne({email: email}).then((user,done)=> 
        // {
        //     console.log("i found the user in db")

        //     if (!user || (password != user.password)){

        //         console.log("invalid password!");

        //         return done(null,false);
        //     }
        //     console.log("i came till here")
        //     console.log(user);
        //     tempUser = user;

        //     return done(null,user);
            
        // }
        // )
        
        // return done(null,tempUser);

    }

));


//serialize // this will store the id in cookied in encrypted format
//serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user,done){
    console.log("serialized is called");
    done(null,user.id);
});

//deserializing the userfrom key in cookies

passport.deserializeUser(
    
    async function(id,done){
        console.log("12deserialize iss called")
        try{

            let user = await User.findById(id);
            console.log("deserialize iss called")
            return done(null,user)
        }
        
        catch(err){
            console.log('error in finding user --> passport');
            return done(err);   

        }
    }
    
);

//check th
passport.checkAuthentication = function(req,res,next){

    console.log("authen is called");

    if (req.isAuthenticated()){
        return next();
    }

    //if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){

    if (req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending to locals for the views
        res.locals.user = req.user;
    }

    next();

}



module.exports = passport;