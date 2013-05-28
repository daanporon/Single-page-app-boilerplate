define([
    'jquery', 'collections/pages', 'appconfig', 'app'
], function($, pagesCollection, config, app) {

    // public functions
    var index, show, unloadShow;

    // private functions
    var getPage;

    index = function() {
        app.setTitle('');
        app.injectTemplate('pages/index', {
            'pages': pagesCollection.findAll()
        });
    };

    show = function(slug) {
        var page = getPage(slug);

        app.setTitle(page.title);
        app.injectTemplate('pages/show', {
            'page': page
        });
    };

    unloadShow = function() {
        console.log('This gets called when we navigate away from a detail page.');
    };

    getPage = function(slug) {
        var page = pagesCollection.findBySlug(slug);

        if (page == null) {
            app.throwNotFoundException('No page found for slug ' + page);
            return null;
        }

        return page;
    };

    return {
        'index': index,
        'show': show,
        'unloadShow': unloadShow
    };

});
