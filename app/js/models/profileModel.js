define([
    'strings',
    'models/baseModel'
], function(
    strings,
    BaseModel
) {
    var ProfileModel = BaseModel.extend({
        url: strings.baseApiUrl + 'profile',

        defaults: {
            url: null,
            id: null,
            user: null
        }
    }, {
        instance: null,

        getInstance: function() {
            this.instance = this.instance || new ProfileModel();
            return this.instance;
        }
    });

    return ProfileModel;
});
