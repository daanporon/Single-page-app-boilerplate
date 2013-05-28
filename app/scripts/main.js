require(['initializer', 'helpers/exceptionhandler'], function(initializer, exceptionHandler) {

    exceptionHandler.init(); // init the exceptionHandler to make the window.onerror function work!

    try {
        initializer.init();
    } catch(err) {
        exceptionHandler.throwException(err);
    }

});