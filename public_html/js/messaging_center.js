define(['backbone', 'underscore'], function(Backbone, _) {
    var messagingCenter = {};
    _.extend(messagingCenter, Backbone.Events);
    return messagingCenter;
});