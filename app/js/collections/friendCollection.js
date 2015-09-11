define([
    'backbone',
    'strings',
    'models/profileModel'
], function(
    Backbone,
    strings,
    ProfileModel
) {
    var FriendCollection = Backbone.Collection.extend({
        model: ProfileModel,

        url: strings.baseApiUrl + 'profile/friends'
    }, {
        instance: null,

        getInstance: function() {
            this.instance = this.instance || new FriendCollection();
            return this.instance;
        }
    });

    return FriendCollection;
});
