define([
    'jquery',
    'underscore',
    'backbone',
    'foundation',
    'routefilter',
    'models/sessionModel',
    'views/friendListView',
    'views/homeView',
    'views/loginView',
    'views/mainCompositorView',
    'views/movieListView',
    'views/movieView',
    'views/profileView',
    'views/search/movieResultsView'
], function(
    $,
    _,
    Backbone,
    Foundation,
    Routefilter,
    SessionModel,
    FriendListView,
    HomeView,
    LoginView,
    MainCompositorView,
    MovieListView,
    MovieView,
    ProfileView,
    MovieResultsView
) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            'login': 'login',
            'logout': 'logout',
            'profile': 'profile',
            'profile/friends': 'friendList',
            'profile/movies': 'movieList',
            'search/:query': 'search',
            'movies/:id': 'movie',
            '*actions': 'home'
        },

        initialize: function() {
            this.sessionModel = SessionModel.getInstance();

            this.mainCompositorView = new MainCompositorView();

            $('body').html(this.mainCompositorView.render().el);
            $(document).foundation();
        },

        before: function(route) {
            if (route != 'login' && !this.sessionModel.isAuthenticated()) {
                Backbone.history.navigate('login', {trigger: true});
                return false;
            }
        },

        login: function() {
            this.mainCompositorView.setContentView(new LoginView(), 'Login');
        },

        logout: function() {
            this.sessionModel.logout();
        },

        profile: function() {
            this.mainCompositorView.setContentView(new ProfileView(), 'Profile');
        },

        friendList: function() {
            this.mainCompositorView.setContentView(new FriendListView(), 'My Friends');
        },

        movieList: function() {
            this.mainCompositorView.setContentView(new MovieListView(), 'My Movies');
        },

        home: function() {
                this.mainCompositorView.setContentView(new HomeView(), 'Home');
        },

        search: function(query) {
            var movieResultsView = new MovieResultsView({query: query});

            this.mainCompositorView.setContentView(movieResultsView, 'Search Results');
        },

        movie: function(id) {
            var movieView = new MovieView({id: id});

            this.mainCompositorView.setContentView(movieView, 'Movie');
        }
    });

    var initialize = function() {
        var app_router = new AppRouter;
        Backbone.history.start();
    };
    return {
        initialize: initialize
    }
});