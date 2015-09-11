define([
    'jquery',
    'underscore',
    'handlebars',
    'strings',
    'models/sessionModel',
    'views/baseView',
    'text!templates/login.html'
], function(
    $,
    _,
    Handlebars,
    strings,
    SessionModel,
    BaseView,
    loginTemplate
) {
    var LoginView = BaseView.extend({
        template: Handlebars.compile(loginTemplate),

        model: SessionModel.getInstance(),

        events: {
            'click #login-btn': 'login'
        },

        render: function() {
            this.$el.html(this.template());

            return this;
        },

        login: function() {
            self = this;
            $.ajax({
                type: 'POST',
                url: strings.baseApiUrl + 'rest-auth/login/',
                data: {
                    'username': this.$('#username').val(),
                    'password': this.$('#password').val()
                }
            }).done(function(data) {
                self.model.set('token', data.key);
                Backbone.history.navigate('home', {trigger: true});
            }).fail(function() {
                self.$('#loginFailed').foundation('reveal', 'open');
            });
            return false;
        }
    });

    return LoginView;
});