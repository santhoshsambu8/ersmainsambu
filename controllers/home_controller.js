
const User = require('/Users/sambusanthosh/Desktop/ers-main-sambu/Models/user.js'); // requring user
// const Review = require('../models/review');

// let posts = await Post.find({})
//                                 .sort('-createdAt')
//                                 .populate('user')
//                                 .populate({
//                                     path: 'comments',
//                                     populate: {
//                                         path:'user'
//                                     }
//                                 });

// This function is for the passing the variable to the home page, such as reviers array, and employee array
module.exports.home = async function(req, res){
    try{
        // Checking for authorization
        if (!req.isAuthenticated()) {
            req.flash('error' , 'Please LogIn !');
            
            return res.redirect('/users/sign-in');
        }
        // Fetching the user and review from the form
        let assignedTome = await User.findById(req.user.id)
        .populate({
            path: 'assignedReviews',
            populate: {
                path:'reviewedTo'
            }
        });

        let myReviews = await User.findById(req.user.id)
        .populate({
            path: 'myReviews',
            populate: {
                path:'reviewerFrom'
            }
        });

        // Fetching the user and review from the form
        // let user = await User.findById(req.user.id);
        // let review = await Review.find({ reviewer: req.user.id });
        // // console.log(review);

        // // takkng all the necessary part of recipent user in recipent array so that we can pass it as a varibalbe'
        // let recipent = [];
        // for(let i = 0; i<user.userToReview.length ; i++){
        //     let userName = await User.findById(user.userToReview[i]);
        //     recipent.push(userName);
        // }
        // // Taking all the necessary imformation of the reviewers in review array, and passing it in homePage
        // let reviews = [];
        // for(let i = 0; i<review.length ; i++){
        //     let reviewUser = await User.findById(review[i].reviewed);
        //     // console.log(review); 
        //     if(reviewUser != null){
        //         let currUser = {
        //             name : reviewUser.name,
        //             content : review[i].content
        //         }
        //         reviews.push(currUser);
        //     }
        // }

        // Render the page, with the variable made above , and pass them as the argument

        console.log(assignedTome.assignedReviews);

        return res.render('home',{
            title : "ERS | HOME",
            assignedTome : assignedTome,
            myReviews : myReviews,
            
        });

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}