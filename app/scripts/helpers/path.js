(function (root, factory) {
    if (typeof exports !== 'undefined') {
        var routing;
        if (typeof __dirname !== "undefined") {
            routing = require(__dirname + '/../resources/config/routing');
        } else {
            routing = require('./app/scripts/resources/config/routing'); // casperjs doesn't understand __dirname
        }

        if (typeof module !== 'undefined' && module.exports) {
            // Export module
            module.exports = factory(routing);
        }
        exports.path = factory(routing);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('helpers/path', ['routing'], factory);
    }
}(this, function (routing) {

    var generatePath;

    generatePath = function(route) {
        var routeObj = routing[route],
            routePath;

        if (typeof routeObj !== "undefined") {
            routePath = routeObj['path'];
        }

        if (typeof routePath !== "undefined") {

            var i, arg, params = [],
                args = Array.prototype.slice.call(arguments);

            args.splice(0, 1); // first argument is the route

            var index = 0;
            routePath = routePath.replace(/(:[^\/]+)/ig, function () {
                return args[index++];
            });

/*
            for (i = 0; i < args.length; i++) {
                arg = args[i];

                if(typeof arg === "string") {
                    var pair = arg.split('=');

                    if (routePath.indexOf(':' + pair[0]) !== -1) {
                        routePath = routePath.replace(':' + pair[0], pair[1]);
                    } else {
                        params.push(arg);
                    }
                }
            }

            if (params.length > 0) {
                routePath = routePath + '?' + params.join('&');
            }
*/

            return routePath;
        } else {
            return "#";
        }
    };

    return {
        'generatePath': generatePath
    };

}));
