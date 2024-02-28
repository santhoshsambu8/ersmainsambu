const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true,
    },

    name:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    assignedReviews:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        }
      ],
      myReviews:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        }
      ]

},{
    timestamps: true
});

const User = mongoose.model('User',userSchema);

module.exports = User;