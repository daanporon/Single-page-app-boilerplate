define(['underscore.string'], function(_s) {

    // public functions
    var isBlank, isValidEmail;

    // private variables
    var emailRegexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    isBlank = function(value) {
        return _s.isBlank(value);
    };

    isValidEmail = function(value) {
        return value.match(emailRegexp);
    };

    return {
        'isBlank': isBlank,
        'isValidEmail': isValidEmail
    };

});