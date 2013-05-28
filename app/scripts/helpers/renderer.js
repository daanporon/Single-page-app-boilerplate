define(['require', 'jquery', 'hbs/underscore', 'appconfig', 'helpers/router'], function(require, $, _, config, router) {

    // public functions
    var render, inject;

    // private variables;
    var defaults = {
        'config': config
    };

    render = function(template, data, callback) {
        data = typeof data === "object" && data != null ? _.extend(defaults, data) : defaults;
        require(['hbs!templates/' + template], function(tpl) {
            if (typeof callback === "function") {
                callback(tpl(data));
            }
        });
    };

    inject = function(template, data, selector, callback, force) {
        if (selector == null) {
            selector = 'main';
        }
        // default don't render on the first route because the server will have rendered it!
        if (force || !router.isFirstRoute()) {
            render(template, data, function(content) {
                $(selector).html(content);
                if (typeof callback === "function") {
                    callback(content);
                }
            });
        }
    };

    return {
        'render': render,
        'inject': inject
    };
});
