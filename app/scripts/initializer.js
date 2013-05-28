define([
    'require', 'jquery', 'helpers/analytics'
], function(require, $, analytics) {

    // public functions
    var init;

    // private functions
    var initPlugins;

    // private variables
    var appRouter;

    init = function() {
        require(['helpers/router'], function(router) {
            router.init();

            appRouter = router;
        });

        initPlugins();
    };

    initPlugins = function() {
        // Some basic analytics tracking
        $(document).on('click', 'a[href^="http"]:not([data-outgoing="false"])', function(e) {
            var $this = $(this);

            $this.attr('target', '_blank');
            analytics.trackEvent('outgoing', 'link', $this.attr('href'));
        });

        $(document).on('click', 'a[href^="mailto"]:not([data-outgoing="false"])', function(e) {
            var $this = $(this);

            analytics.trackEvent('outgoing', 'email', $this.attr('href').split(':')[1]);
        });
    };

    return {
        'init': init
    };

});