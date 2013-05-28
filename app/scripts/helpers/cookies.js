define(['hbs/json2'], function (JSON) {

    // public functions
    var setCookie, getCookie, removeCookie;

    // private functions
    var getCookieName;

    // private variables
    var prefix = 'spa';

    getCookieName = function(name) {
        return [prefix, name].join('_');
    };

    setCookie = function(name, value, expires, json) {
        name = getCookieName(name);

        if (value === null) {
            expires = -1;
        }

        value = json ? JSON.stringify(value) : String(value);

        var cookie = [encodeURIComponent(name) + "=" + encodeURIComponent(value)];

        if (typeof expires === 'number') {
            if (expires != 0) { // expires == 0 means session cookie, cookie should be destroyed when window is closed ...
                var days = expires,
                    expires = new Date();

                expires.setDate(expires.getDate() + days);
                cookie.push("expires=" + expires.toUTCString());
            }
        } else {
            cookie.push("expires=" + expires.toUTCString());
        }

        cookie.push("path=/");
        document.cookie = (document.cookie = cookie.join(';'));
    };

    getCookie = function(name, json) {
        var i, x, y,
            cookies = document.cookie.split(";");

        name = getCookieName(name);

        for (i = 0; i < cookies.length; i++) {
            x = cookies[i].substr(0, cookies[i].indexOf("="));
            y = cookies[i].substr(cookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g,"");

            if (x == name) {
                return json ? JSON.parse(decodeURIComponent(y)) : decodeURIComponent(y);
            }
        }
    };

    removeCookie = function(name) {
        if (getCookie(name) !== null) {
            setCookie(name, null);
            return true;
        }
        return false;
    };

    return {
        'setCookie': setCookie,
        'getCookie': getCookie,
        'removeCookie': removeCookie
    };

});