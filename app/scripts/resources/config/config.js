(function (root, factory) {
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = factory();
        }
        exports.config = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
}(this, function () {
    return {
        'title': {
            'suffix': 'Single page app boilerplate',
            'delimiter': '|'
        },
        'gacode': 'UA-XXXXXXXX-X',
        'base_host': 'localhost:3000',
    };
}));
