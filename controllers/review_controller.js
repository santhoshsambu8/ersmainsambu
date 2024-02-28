// include User and Review Schema //
const User = require('/Users/sambusanthosh/Desktop/ers-main-sambu/Models/user.js');
const Review = require('/Users/sambusanthosh/Desktop/ers-main-sambu/Models/review.js');

// create riview controller fumction //
module.exports.newReview = async (req, res) => {

    try {
        // first find recieoient //
        let review = await Review.findById(req.params.id);
        review.content = req.query.newReview;
        review.save();
        

        
        return res.redirect('/');
    } catch (err) {
        console.log('error', err);
        return;
   }
}