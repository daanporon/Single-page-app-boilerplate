define('helpers/exceptionhandler', [
    'appconfig', 'helpers/router', 'helpers/logger', 'helpers/renderer', 'helpers/analytics'
], function(config, router, logger, renderer, analytics, modal, Raven) {

    // public functions
    var init, throwNotFoundException, throwException;

    // private functions
    var showErrorPage;

    // private variables
    var initialized = false;

    init = function() {
        if (!initialized) {
            window.onerror = function(message, fileurl, lineno, traceback, timestamp) {
                logger.log('error', message);
                showErrorPage(false);
            };
        }
        initialized = true;
    }

    showErrorPage = function(notFound) {
        if(notFound) {
            renderer.inject('errors/404', null, function(tpl) {
                analytics.trackPageview('/404' + router.getRoute());
            });
        } else {
            renderer.inject('errors/500', null, function(tpl) {;
                analytics.trackPageview('/500' + router.getRoute());
            });
        }
        router.afterCurrentRoute(function() {
            console.log('Do some cleanup after the error pages');
        });
    };

    throwNotFoundException = function(exception) {
        logger.log('not found', exception);
        showErrorPage(true);
    };

    throwException = function(exception) {
        logger.log('regular', exception);
        showErrorPage();
    };

    return {
        'init': init,
        'throwException': throwException,
        'throwNotFoundException': throwNotFoundException
    };

});