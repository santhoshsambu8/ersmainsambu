const User = require('/Users/sambusanthosh/Desktop/ers-main-sambu/Models/user.js'); // requring user


module.exports.profile = function(req,res){

    res.end('<h1>User Profile</h1>');
    
}

// redering the singIN page
module.exports.signIn = function(req, res){
    return res.render('sign_in', {
        title : 'ERS | Sign-In'
    });
}

// creating the session, basically for logging In
module.exports.createSession = async function(req, res){
    // console.log(req.body);
    req.flash('success', 'You are logged In');
    return res.redirect('/');
}

module.exports.signUp = function(req, res){
    return res.render('sign_up', {
        title : 'ERS | SignUp'
    });
}

// This fucntion is for creating the new user
module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirmPassword){
        //disply flash messages
        req.flash('error' , 'Password should be equal to Confirm Password');
        return res.redirect('back');
    }
    let user = await User.findOne({email : req.body.email});
    if(!user){
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            // isAdmin : false
        });
        
        return res.redirect('/users/sign-in');
    }
    return res.redirect('back');
}

// This fucniton is used for logging Out
module.exports.destroySession = function (req, res, done){
    return req.logout((err) =>{
        if(err){
            return done(err);
        }
        req.flash('success' , 'Logged Out Sucessfully !');
        return res.redirect('/users/sign-in');
    });
    
}

// Adding employe, it is same as signUp , but it will redirect you to the addEmplyee page, where as 
// that will redirect you to the sing-in page
module.exports.addEmployeee = async function(req, res){
    if(req.body.password != req.body.confirmPassword){
        //disply flash messages
        req.flash('error' , 'Password should be equal to Confirm Password');
        return res.redirect('back');
    }
    let user = await User.findOne({email : req.body.email});
    if(!user){
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            isAdmin : false
        });
        
        return res.redirect('/admin/view-employee');
    }
    req.flash('error' , 'user already present');
    return res.redirect('back');
}

