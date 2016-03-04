// TODO: Use Backbone.Events instead
define(function (require) {

    var Backbone = require('backbone'),
        _ = require('underscore');

    var messagingCenter = {};
    _.extend(messagingCenter, Backbone.Events);

    return messagingCenter;

});