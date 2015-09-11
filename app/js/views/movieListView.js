define([
    'jquery',
    'backbone',
    'handlebars',
    'collections/movieCollection',
    'views/baseView',
    'text!templates/movieList.html'
], function(
    $,
    Backbone,
    Handlebars,
    MovieCollection,
    BaseView,
    movieListTemplate
) {
    var MovieListView = BaseView.extend({
        template: Handlebars.compile(movieListTemplate),

        collection: MovieCollection.getInstance(),

        events: {
            'click a': 'navigateToMovie'
        },

        preload: function() {
            return [this.collection.fetch()];
        },

        render: function() {
            if (this.finishedLoading) {
                this.$el.html(this.template({movies: this.collection.toJSON()}));
            } else {
                this.$el.html(this.loadingTemplate());
            }

            return this;
        },

        navigateToMovie: function(e) {
            e.preventDefault();
            Backbone.history.navigate('movies/' + $(e.currentTarget).data('movie-id'), {trigger: true});
        }
    });

    return MovieListView;
});