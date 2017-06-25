/**
 * Created by user on 15-06-2017.
 */

var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('userModel', userSchema);
var q = require('q');


    userModel.createUser = createUser;
    userModel.findUserById = findUserById;
    userModel.findUserByUsername = findUserByUsername;
    userModel.findUserByCredentials = findUserByCredentials;
    userModel.findAllUsers = findAllUsers;
    userModel.findAllCritics = findAllCritics;
    userModel.updateUser = updateUser;
    userModel.updateRatingAndReview = updateRatingAndReview;
    userModel.deleteUser = deleteUser;
    userModel.followUser = followUser;
    userModel.unfollowUser = unfollowUser;
    userModel.findUserByFacebookId= findUserByFacebookId;

module.exports = userModel;

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function findAllUsers() {
    return userModel.find({critic: false});
}

function findAllCritics() {
    return userModel.find({critic: true});
}

function findUserById(userId) {
    var deferred = q.defer();
    userModel
        .findById(userId,function (error,user) {
            if(error){
                deferred.reject(error);
            }
            else {
                console.log("found user");
                deferred.resolve(user);
            }
    });
    return deferred.promise;
}

function updateRatingAndReview(userId,rateAndReview) {
    var rating = rateAndReview.rates;
    var review = rateAndReview.reviews;
    return userModel
        .update({_id: userId},
                {$push: {rates: rating,
                         reviews: review}});
}

function findUserByUsername(username) {
    var deferred = q.defer();
    userModel
        .findOne({username: username},function (error,user) {
         if(error){
             deferred.reject(error);
         }
         else{
             deferred.resolve(user);
         }
    });
    return deferred.promise;
}

function updateUser(userId,user){
    delete user._id;
    return userModel
        .update({_id:userId},
                {$set: {firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        admin: user.admin}}
    );
}

function deleteUser(userId) {
    var deferred = q.defer();
    userModel
        .findByIdAndRemove(userId,function (error,user) {
        if(error){
            deferred.reject(error);
        }
        else
        {
            deferred.resolve(user);
        }
    });
    return deferred.promise;
}

function followUser(userId,follows) {
    return userModel
        .update({_id: userId},
                {$push: {follows: follows}});
}

function unfollowUser(id,username){
    return userModel
        .update({_id: id},
                {$pull:{follows:{username: username}}});
}

function findUserByCredentials(username,passowrd) {
    var deferred = q.defer();
    userModel.findOne({username:username,password:passowrd},function (error,user) {
        if(error)
        {
            deferred.reject(error);
        }
        else
        {
            deferred.resolve(user);
        }

    });
    return deferred.promise;
}

function createUser(user) {
    var deferred = q.defer();
    if(user.username == 'admin')
    {
        user.admin = true;
    }
    userModel.create(user,function (error,user) {
        if(error)
        {
            deferred.reject(error);
        }
        else
        {
            deferred.resolve(user);
        }
    });
    return deferred.promise;
}

