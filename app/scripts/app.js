define([
    'helpers/router', 'helpers/renderer', 'helpers/titlesetter', 'helpers/path', 'helpers/exceptionhandler'
], function(router, renderer, titleSetter, pathHelper, exceptionHandler) {

    // public functions
    var getRouter, getRenderer, getTitleSetter, getPathHelper,
        setTitle, injectTemplate, generatePath, setRoute, getRoute, throwException, throwNotFoundException;

    getRouter = function() {
        return router;
    };

    getRenderer = function() {
        return renderer;
    };

    getTitleSetter = function() {
        return titlesetter;
    };

    getPathHelper = function() {
        return pathHelper;
    };

    setTitle = function(value, format) {
        titleSetter.setTitle(value, format);
    };

    injectTemplate = function(template, data, selector, callback, force) {
        renderer.inject(template, data, selector, callback, force);
    };

    generatePath = function(route) {
        return pathHelper.generatePath.apply(this, arguments || []);
    };

    setRoute = function(route) {
        router.setRoute.apply(this, [pathHelper.generatePath.apply(this, arguments)]);
    };

    getRoute = function() {
        return router.getRoute();
    };

    throwException = function(exception) {
        exceptionHandler.throwException(exception);
    };

    throwNotFoundException = function(exception) {
        exceptionHandler.throwNotFoundException(exception);
    };

    return {
        'getRouter': getRouter,
        'getRenderer': getRenderer,
        'getTitleSetter': getTitleSetter,
        'getPathHelper': getPathHelper,
        'setTitle': setTitle,
        'injectTemplate': injectTemplate,
        'generatePath': generatePath,
        'setRoute': setRoute,
        'getRoute': getRoute,
        'throwException': throwException,
        'throwNotFoundException': throwNotFoundException
    };

});