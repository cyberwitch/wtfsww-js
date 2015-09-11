define([
    'handlebars',
    'collections/searchMovieCollection',
    'views/baseView',
    'text!templates/movie.html'
], function(
    Handlebars,
    SearchMovieCollection,
    BaseView,
    movieTemplate
) {
    var MovieView = BaseView.extend({
        template: Handlebars.compile(movieTemplate),

        collection: SearchMovieCollection.getInstance(),

        initialize: function(options) {
            BaseView.prototype.initialize.call(this);

            options = options || {};

            this.model = this.collection.getOrAdd(options.id);
        },

        preload: function() {
            return [this.model.fetch()];
        },

        render: function() {
            if (this.finishedLoading) {
                this.$el.html(this.template(this.model.toJSON()));
            } else {
                this.$el.html(this.loadingTemplate());
            }

            return this;
        }
    });

    return MovieView;
});