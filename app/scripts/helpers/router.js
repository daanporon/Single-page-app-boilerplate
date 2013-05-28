define([
    'jquery', 'underscore.string', 'hbs/underscore',
    'routing', 'helpers/exceptionhandler', 'helpers/analytics',
    'director'
], function($, _s, _, routes, exceptionHandler, analytics, router) {

    // public functions
    var init, setRoute, getRoute, isFirstRoute, afterCurrentRoute, onRoute;

    // private variables
    var router, initialized = false, firstRoute = true, afterCurrentRouteEventListeners = [], onRouteEventListeners = [];

    var init = function() {
        if (!initialized) {
            router = new Router();

            router.configure({
               html5history: true,
               after: function() {
                    firstRoute = false;
               },
               'notfound': function() {
                    if (_s.isBlank(router.getCurrentRoute())) { // hack to make the back button work on the homepage
                        router.setRoute('/');
                        return;
                    }
                    exceptionHandler.throwNotFoundException('Page not found ' + router.getCurrentRoute());
                }
            });

            router.hasHistorySupport = function() {
                return this.history && this.historySupport;
            };

            router.getCurrentRoute = function() {
                return this.hasHistorySupport() ? window.location.pathname : window.location.hash.substring(1);
            };

            for (var routeName in routes) {

                (function(route) {
                    var config = route,
                        path = config.path,
                        controllerName = config.controller,
                        controllerAction = config.action,
                        onUnload = config.after,
                        registerRoute;

                    registerRoute = function(route) {
                        router.on(route, function() {
                            // track virtual page view on google analytics
                            analytics.trackPageview(router.getRoute());

                            // catch the arguments to pass through to the controller action
                            var args = arguments || [];

                            args = _.toArray(arguments);

                            require(['controllers/' + controllerName], function(controller){
                                if (controllerAction) {
                                    fn = controller[controllerAction];
                                    if(typeof fn === 'function') {
                                        fn.apply(this, args);
                                    }
                                } else {
                                    controller.index();
                                }
                            });

                            var i;
                            for (i = 0; i < onRouteEventListeners.length; i++) {
                                onRouteEventListeners[i](config);
                            }
                        });

                        router.on('after', route, function() {
                            if (onUnload) {
                                require(['controllers/' + controllerName], function(controller){
                                    fn = controller[onUnload];
                                    if(typeof fn === 'function') {
                                        fn();
                                    }
                                });
                            }

                            var i;
                            for (i = 0; i < afterCurrentRouteEventListeners.length; i++) {
                                afterCurrentRouteEventListeners[i](config);
                            }

                            afterCurrentRouteEventListeners = [];
                        });
                    };

                    registerRoute(new RegExp(path + '(\\?[\\.a-zA-Z0-9=&_-]+)?'));

                })(routes[routeName]);
            }

            $(document).on('click', "a[href^='/']:not([data-noajax='true'])", function(e) {
                e.preventDefault();

                var $this = $(this),
                    url = $this.attr("href");

                router.setRoute(url);
            });

            router.init();

            if (!router.hasHistorySupport()) {
                if (_s.isBlank(router.getCurrentRoute())) {
                    window.location = '/#' + window.location.pathname + window.location.search;
                }
            }

            initialized = true;
        }
    };

    setRoute = function(route) {
        if (typeof router !== "undefined") {
            router.setRoute(route);
        }
    };

    getRoute = function() {
        if (typeof router !== "undefined") {
            return router.getCurrentRoute();
        }
    };

    isFirstRoute = function() {
        var $meta = $('meta[name="rendered_url"]');

        return firstRoute && $meta.attr('content') === getRoute();
    };

    afterCurrentRoute = function(fn) { // triggered only after the current route
        afterCurrentRouteEventListeners.push(fn);
    };

    onRoute = function(fn) { // triggered on every route
        onRouteEventListeners.push(fn);
    };

    return {
        'init': init,
        'setRoute': setRoute,
        'getRoute': getRoute,
        'isFirstRoute': isFirstRoute,
        'afterCurrentRoute': afterCurrentRoute,
        'onRoute': onRoute
    };
});
