(function (root, factory) {
    if (typeof exports !== 'undefined') {
        var pages = require(__dirname + '/../resources/data/pages')
            _s = require(__dirname + '/../vendor/underscore.string');

        if (typeof module !== 'undefined' && module.exports) {
            module.exports = factory(pages, console, _s);
        }
        exports.contentCollection = factory(pages, console, _s);
    } else if (typeof define === 'function' && define.amd) {
        define([
            'resources/data/pages',
            'helpers/logger',
            'underscore.string'
        ], factory);
    }
}(this, function (data, logger, _s) {

    // public functions
    var findAll, findBySlug, findByTag;

    // private functions
    var generateResult;

    // private variables
    var pages = {}, tags = {};

    // initialize indexes
    var rawTags, tag, page, i, j;
    for (i = 0; i < data.length; i++) {
        page = data[i];
        slug = page['slug'];

        // create tags index
        rawTags = page['categories'];
        if (typeof rawTags !== "undefined") {
            for (j = 0; j < rawTags.length; j++) {
                tag = rawTags[j];
                if (typeof tags[tag] === "undefined") {
                    tags[tag] = [];
                }
                tags[tag].push(slug);
            }
        }

        pages[slug] = page;
    }

    findAll = function() {
        return pages;
    };

    findBySlug = function(slug) {
        return pages[slug];
    };

    findByTag = function(tag) {
        return generateResult(tags[tag]);
    };

    generateResult = function(slugArr) {
        var result = [], i, slug;

        if (slugArr != null) {
            for (i = 0; i < slugArr.length; i++) {
                slug = slugArr[i];

                result.push(content[slug]);
            }
        }

        return result;
    };

    return {
        'findAll': findAll,
        'findBySlug': findBySlug,
        'findByTag': findByTag
    };

}));