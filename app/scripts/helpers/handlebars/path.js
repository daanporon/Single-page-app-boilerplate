(function (root, factory) {
    if (typeof exports !== 'undefined') {
        var hbs = require('hbs'),
            path = require(__dirname + '/../path');

        if (typeof module !== 'undefined' && module.exports) {
            // Export module
            module.exports = factory(hbs, path);
        }
        exports.path = factory(hbs, path);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('helpers/handlebars/path', ['handlebars', 'helpers/path'], factory);
    }
}(this, function (hbs, path) {

    var generatePath;

    generatePath = function(route) {
        var fn = path['generatePath'];
        if(typeof fn === 'function') {
            return fn.apply(this, arguments || []);
        }

        return null;
    };

    hbs.registerHelper('path', generatePath);

    return generatePath;

}));
