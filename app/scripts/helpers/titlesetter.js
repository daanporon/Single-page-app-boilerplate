define(['underscore.string', 'appconfig'], function(_s, config) {

    // public functions
    var setTitle;

    // private variable
    var titleSuffix = config.title.suffix,
        titleDelimiter = config.title.delimiter;

    setTitle = function(value, format) {
        if (typeof format === "string") {
            value = _s.sprintf(format, value);
        }

        if (value != null && !_s.isBlank(value)) {
            document.title = value + ' ' + titleDelimiter + ' ' + titleSuffix;
        } else {
            document.title = titleSuffix;
        }
    };

    return {
        'setTitle': setTitle
    };

});