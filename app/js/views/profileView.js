define([
    'handlebars',
    'models/profileModel',
    'views/baseView',
    'text!templates/profile.html'
], function(
    Handlebars,
    ProfileModel,
    BaseView,
    profileTemplate
) {
    var ProfileView = BaseView.extend({
        template: Handlebars.compile(profileTemplate),

        model: ProfileModel.getInstance(),

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

    return ProfileView;
});