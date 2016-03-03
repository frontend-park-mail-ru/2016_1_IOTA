define([
    'backbone',
    'jquery',
    'messaging_center'
], function (
    Backbone,
    $,
    messagingCenter
) {

    var SessionModel = Backbone.Model.extend({
        sessionUrl: '/api/v1/session/',
        userUrl: '/api/v1/user/',
        login: function(login, password) {
            $.ajax({
                method: 'PUT',
                url: this.sessionUrl,
                data: {
                    'login': login,
                    'password': password
                },
                success: function (data) {
                    if (data.status === 0) {
                        messagingCenter.trigger('loginOk');
                    } else {
                        messagingCenter.trigger('loginError', data.message);
                    }
                },
                error: function (data) {
                    messagingCenter.trigger('loginError', data.message);
                }
            });
        },
        logout: function () {
            $.ajax({
                method: 'DELETE',
                url: this.sessionUrl,
                success: function () {
                    alert("Successfull logout");
                },
                error: function() {
                    alert("Logout failed");
                }
            });
        },
        /*
        getSession: function() {
            $.ajax({
                method: 'GET',
                url: this.sessionUrl,
                success: function () {
                    alert("Successfull logout");
                },
                error: function () {
                    alert("Logout failed");
                }
            });
        },
        */
        register: function(login, password, email) {
            $.ajax({
                method: 'POST',
                url: this.userUrl,
                data: {
                    'login': login,
                    'password': password,
                    'email': email
                },
                success: function () {
                    alert("Successfull login");
                },
                error: function () {
                    alert("Login failed");
                }
            });
        }
    });

    return SessionModel;

});