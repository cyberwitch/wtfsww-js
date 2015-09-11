define([
    'jquery',
    'underscore',
    'foundation',
    'foundationOffCanvas',
    'handlebars',
    'models/sessionModel',
    'models/sidebarModel',
    'views/baseView',
    'views/search/searchbarView',
    'text!templates/sidebar.html'
], function(
    $,
    _,
    Foundation,
    FoundationOffCanvas,
    Handlebars,
    SessionModel,
    SidebarModel,
    BaseView,
    SearchbarView,
    sidebarTemplate
) {
    var SidebarView = BaseView.extend({
        template: Handlebars.compile(sidebarTemplate),

        model: new SidebarModel(),

        sessionModel: SessionModel.getInstance(),

        events: {
            'click a': 'onItemClick'
        },

        initialize: function() {
            BaseView.prototype.initialize.call(this);

            this.searchbarView = new SearchbarView({sidebarView: this});

            this.sessionModel.on('change', this.render, this);
        },

        render: function() {
            this.$el.html(this.template({
                sections: this.sessionModel.isAuthenticated() ? this.model.get('authenticated') : this.model.get('unauthenticated'),
                isAuthenticated: this.sessionModel.isAuthenticated()
            }));
            this.$('.searchbar').html(this.searchbarView.render().el);

            return this;
        },

        collapse: function() {
            Foundation.utils.is_small_only() && $('.off-canvas-wrap').foundation('offcanvas', 'hide', 'move-right');
        },

        onItemClick: function(e) {
            e.preventDefault();
            this.collapse();
            Backbone.history.navigate($(e.currentTarget).data('route'), {trigger: true});
        }
    });

    return SidebarView;
});