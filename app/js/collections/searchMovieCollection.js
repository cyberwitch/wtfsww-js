define([
    'underscore',
    'backbone',
    'strings',
    'models/movieModel'
], function(
    _,
    Backbone,
    strings,
    MovieModel
) {
    var SearchMovieCollection = Backbone.Collection.extend({
        model: MovieModel,

        url: strings.baseApiUrl + 'movies',

        searchCache: [],

        get: function(ids) {
            var self = this;

            if (ids.constructor === Array) {
                return _.map(ids, function(id) {
                    return Backbone.Collection.prototype.get.call(self, id);
                });
            } else {
                return Backbone.Collection.prototype.get.call(this, ids);
            }
        },

        getOrAdd: function(id) {
            var model = this.get(id);

            if (!model) {
                model = new MovieModel({id: id});
                this.add(model);
            }

            return model;
        },

        fetch: function(options) {
            var self = this;

            options = options || {};

            if (options.query) {
                if (this.searchCache && this.searchCache[options.query]) {
                    return $.Deferred()
                        .resolveWith(this, [_.pluck(this.get(this.searchCache[options.query]), 'attributes')]);
                } else {
                    return this.fetch({
                        data: {query: options.query},
                        dataType: 'json',
                        remove: false
                    }).done(function(data) {
                        self.searchCache[options.query] = _.pluck(data, 'id');
                    });
                }

                return deferred.promise();
            } else {
                return Backbone.Collection.prototype.fetch.call(this, options);
            }
        }
    }, {
        instance: null,

        getInstance: function() {
            this.instance = this.instance || new SearchMovieCollection();
            return this.instance;
        }
    });

    return SearchMovieCollection;
});
