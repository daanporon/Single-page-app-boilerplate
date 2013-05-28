(function (root, factory) {
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = factory();
        }
        exports.routing = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
}(this, function () {
    return {
        'pages_path': {
            'path': '/',
            'controller': 'pages'
        },
        'page_path': {
            'path': '/:slug',
            'controller': 'pages',
            'action': 'show',
            'after': 'unloadShow'
        }
    };
}));