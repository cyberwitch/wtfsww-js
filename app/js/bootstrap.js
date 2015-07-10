require.config({
    paths: {
        jquery: 'libs/jquery/dist/jquery',
        jqueryui: 'libs/jquery-ui/jquery-ui',
        underscore: 'libs/underscore-amd/underscore',
        backbone: 'libs/backbone-amd/backbone',
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
