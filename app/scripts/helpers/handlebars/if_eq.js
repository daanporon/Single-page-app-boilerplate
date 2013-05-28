// https://github.com/danharper/Handlebars-Helpers/blob/master/helpers.js
(function (root, factory) {
    if (typeof exports !== 'undefined') {
        var hbs = require('hbs');

        if (typeof module !== 'undefined' && module.exports) {
            // Export module
            module.exports = factory(hbs);
        }
        exports.if_eq = factory(hbs);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('helpers/handlebars/if_eq', ['handlebars'], factory);
    }
}(this, function (hbs) {

    var if_eq;

    if_eq = function(context, options) {
        if (typeof options !== "undefined") {
            if (context == options.hash.compare)
                return options.fn(this);
            return options.inverse(this);
        }
    };

    hbs.registerHelper('if_eq', if_eq);

    return if_eq;

}));
