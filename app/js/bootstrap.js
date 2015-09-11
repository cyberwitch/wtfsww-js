require.config({
    paths: {
        jquery: 'libs/routefilter/libs/jquery/jquery',
        jqueryui: 'libs/jquery-ui/jquery-ui',
        underscore: 'libs/routefilter/libs/underscore',
        backbone: 'libs/routefilter/libs/backbone',
        routefilter: 'libs/routefilter/dist/backbone.routefilter',
        handlebars: 'libs/handlebars/handlebars.amd',
        text: 'libs/requirejs-text/text',
        foundation: 'libs/foundation/js/foundation',
        foundationOffCanvas: 'libs/foundation/js/foundation/foundation.offcanvas'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        routefilter: {
            deps: ['backbone']
        },
        jqueryui: {
            deps: ['jquery']
        },
        foundation: {
            deps: ['jquery'],
            exports: 'Foundation'
        },
        foundationOffCanvas: {
            deps: ['foundation']
        }
    }
});

require(['app'], function(App) {
    App.initialize();
});
