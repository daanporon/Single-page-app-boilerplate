define(['underscore.string'], function(_s) {

    // public functions
    var getParameters;

    getParameters = function() {
        var params = {}, paramsRaw, pair, query;

        query = window.location.search.substring(1);

        if (_s.isBlank(query)) {
            var hashArr = window.location.hash.substring(1).split('?');

            if (typeof hashArr[1] !== "undefined") {
                query = hashArr[1];
            }
        }

        if (!_s.isBlank(query)) {
            paramsRaw = query.split('&');
            for (var i = 0; i < paramsRaw.length; i++) {
                pair = paramsRaw[i].split('=');

                params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            }
        }

        return params;
    };

    return {
        'getParameters': getParameters
    };

});