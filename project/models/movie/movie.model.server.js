/**
 * Created by user on 15-06-2017.
 */

var mongoose = require('mongoose');
var movieSchema = require('./movie.schema.server');
var movieModel = mongoose.model('movieModel', movieSchema);

movieModel.findMovieById = findMovieById;
movieModel.findAllMovies = findAllMovies;
movieModel.updateRatingAndReview = updateRatingAndReview;
movieModel.createMovie = createMovie;

module.exports = movieModel;

function findMovieById(id) {
    return movieModel
        .find({tmdbId: id});
}

function findAllMovies(){
    return movieModel
        .find();
}

function updateRatingAndReview(id,ratingsAndReviews) {
    var ratings = ratingsAndReviews.ratings;
    var reviews = ratingsAndReviews.reviews;
    return movieModel
        .update({tmdbId: id},
            {$push:
                {ratings:ratings,
                    reviews: reviews}});
}

function createMovie(movie) {
    return movieModel.create(movie);
}