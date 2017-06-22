/**
 * Created by user on 15-06-2017.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    admin: String,
    //role: {type: String,default: 'User', enum:['Admin','User']},
    // user can give ratings and reviews to many movies hence they should be an array
    rates: [
        {
            name: String,
            tmdbId: String,
            rating: Number,
            imageUrl: String
        }
    ],
    reviews:[
        {
            name: String,
            tmdbId: String,
            review: String,
            imageUrl: String,
            visible: String,
            flagged: String
        }
    ],
    // Every user can follow other users
    follows: [{
        username: String,
        userId: String
    }],
    facebook: {
        id:    String,
        token: String
    }
}, {collection: "project_user"});

module.exports = userSchema;