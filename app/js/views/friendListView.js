define([
    'jquery',
    'backbone',
    'handlebars',
    'collections/friendCollection',
    'views/baseView',
    'text!templates/friendList.html'
], function(
    $,
    Backbone,
    Handlebars,
    FriendCollection,
    BaseView,
    friendListTemplate
) {
    var FriendListView = BaseView.extend({
        template: Handlebars.compile(friendListTemplate),

        collection: FriendCollection.getInstance(),

        preload: function() {
            return [this.collection.fetch()];
        },

        render: function() {
            if (this.finishedLoading) {
                this.$el.html(this.template({friends: this.collection.toJSON()}));
            } else {
                this.$el.html(this.loadingTemplate());
            }

            return this;
        }
    });

    return FriendListView;
});