define([
    'models/baseModel'
], function(
    BaseModel
) {
    var SidebarModel = BaseModel.extend({
        defaults: {
            authenticated: {
                'WTFSWW': {
                    'Home': 'home',
                    'Profile': 'profile',
                    'Friends': 'profile/friends',
                    'Movies': 'profile/movies',
                    'Log out': 'logout'
                }
            },
            unauthenticated: {
                'WTFSWW': {
                    'Log in': 'login'
                }
            }
        }
    });

    return SidebarModel;
});