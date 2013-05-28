var path = require('path'),
    errors = require(path.resolve(__dirname + '/../' + 'helpers/errors'));

module.exports = function (appDir, config) {

    // public functions
    var index, show;

    // private variables
    var pagesCollection = require(path.resolve('./', appDir, 'scripts', 'collections', 'pages.js'));

    index = function(req, res) {
        res.render('pages/index', {
            'pages': pagesCollection.findAll()
        });
    };

    show = function(req, res) {
        var item = res.locals.item;

        res.render('pages/show', {
            'item': item
        });
    };

    return {
        'index': index,
        'show': show
    };
};