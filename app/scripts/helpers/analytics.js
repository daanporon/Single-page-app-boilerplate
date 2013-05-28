define(['appconfig'], function(config) {

    // public functions
    var trackPageview, trackEvent, trackSocial;

    window._gaq = [['_setAccount', config.gacode]];
           _gaq.push(['_setDomainName', 'none']); // set to none to test tracking locally

    var g=document.createElement('script'),
        s=document.getElementsByTagName('script')[0];

    g.src='http://www.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s);

    trackPageview = function(url) {
        var params = ['_trackPageview'];

        if (typeof url !== "undefined") {
            params.push(url);
        }

        window._gaq.push(params);
    };

    trackEvent = function(category, action, opt_label, opt_value) {
        var params = ['_trackEvent', decodeURIComponent(category), decodeURIComponent(action)];

        if (typeof opt_label !== "undefined") {
            params.push(decodeURIComponent(opt_label));
        }

        if (typeof opt_value !== "undefined") {
            params.push(decodeURIComponent(opt_value));
        }

        window._gaq.push(params);
    };

    trackSocial = function(network, action) {
        window._gaq.push(['_trackSocial', network, action]);
    };

    return {
        'trackPageview': trackPageview,
        'trackEvent': trackEvent,
        'trackSocial': trackSocial
    };

});