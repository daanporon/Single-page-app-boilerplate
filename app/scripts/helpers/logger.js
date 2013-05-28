define([], function() {

    // public functions
    var log;

    log = function() {
        if(window.console){
            console.log(Array.prototype.slice.call(arguments));
        }
    };

    return {
        'log': log
    };

});