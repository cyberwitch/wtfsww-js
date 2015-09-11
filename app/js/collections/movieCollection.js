define([
    'backbone',
    'strings',
    'models/movieModel'
], function(
    Backbone,
    strings,
    MovieModel
) {
    var MovieCollection = Backbone.Collection.extend({
        model: MovieModel,

        url: strings.baseApiUrl + 'profile/movies'
    }, {
        instance: null,

        getInstance: function() {
            this.instance = this.instance || new MovieCollection();
            return this.instance;
        }
    });

    return MovieCollection;
});
