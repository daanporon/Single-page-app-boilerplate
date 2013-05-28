var express = require('express'),
    connect = require('connect'),
    path = require('path'),
    fs = require('fs'),
    file = require('file'),
    hbs = require('hbs'),
    moment = require('moment'),
    handlebars = require('handlebars'),
    _ = require('underscore'),
    _s = require('underscore.string'),
    errors = require(path.resolve(__dirname + '/helpers/errors'));

var appDir = process.env['APP_DIR'] || 'app',
    base = path.resolve(appDir),
    helpersDir = path.resolve(__dirname + '/helpers/handlebars'),
    clientHelpersDir = path.resolve(__dirname + '/../' + appDir + '/scripts/helpers/handlebars'),
    templatesDir = path.resolve(__dirname + '/../' + appDir + '/templates'),
    controllersDir = path.resolve(__dirname + '/controllers'),
    config = require(path.resolve('./', appDir, 'scripts', 'resources', 'config', 'config')),
    pathHelper = require(path.resolve('./', appDir, 'scripts', 'helpers', 'path.js')),
    pagesCollection = require(path.resolve('./', appDir, 'scripts', 'collections', 'pages.js'));

var app = express();

app.configure(function() {
    app.use(connect.static(base)); // this is normally something that yeoman will do .. but we need it before the router!
    app.use(express.cookieParser());
    app.use(function(req, res, next) {
        res.locals.url = req.url.split('?')[0];
        res.locals.titleSuffix = config.title.suffix;
        res.locals.titleDelimiter = config.title.delimiter;
        res.locals.config = config;

        next();
    });
    app.use(app.router);
    app.use(express.bodyParser());
    app.set('views', templatesDir);
    app.set('view engine', 'hbs');
    app.set('view options', { layout: 'layout' });

    app.use(function(err, req, res, next) {
        errors.handleError(err, req, res);
    });
});

// setup the routing
var routing = require(path.resolve('./', appDir, 'scripts', 'resources', 'config', 'routing.js')),
    routeName, controllers = {};

app.param('slug', function(req, res, next, slug) {
    if (slug === "sitemap.xml") { // sitemap.xml is no page
        next('route');
        return;
    }

    var page = pagesCollection.findBySlug(slug);
    if (page != null) {
        res.locals.page = page;

        next();
    } else {
        next(new errors.NotFoundError('No page found for slug ' + slug + '!'));
    }
});

var locateController = function(controllerName) {
    var controller = controllers[controllerName] || require(path.resolve(controllersDir, controllerName))(appDir, config);
    controllers[controllerName] = controller;

    return controller;
};

app.get('/sitemap.xml', function(req, res, next) {
    var pages = require(path.resolve('./', appDir, 'scripts', 'resources', 'data', 'pages.js'));

    res.header("Content-Type", "text/xml");
    res.render('../../server/templates/sitemap', {
        'layout': false,
        'base_host': config.base_host,
        'items': items,
        'lastmod': moment().format('YYYY-MM-DD')
    });
});

// init shared routes
for (routeName in routing) {
    (function(route) {
        var controller = locateController(route.controller),
            controllerAction = route.action;

        app.get(route.path, function(req, res, next) {
            var value = "";
            if (res.locals.page) {
                value = res.locals.page.title;
            }
            res.locals.title = value;

            if (controllerAction) {
                fn = controller[controllerAction];
                if(typeof fn === 'function') {
                    fn.apply(this, [req, res]);
                }
            } else {
                controller.index(req, res);
            }
        });

    })(routing[routeName]);
}

// init server specific handlebar helpers
fs.readdirSync(helpersDir).forEach(function (file) {
    var filePath = path.resolve('./', helpersDir, file);

    require(filePath)();
});

// init server and client handlebar helpers
fs.readdirSync(clientHelpersDir).forEach(function (file) {
    var filePath = path.resolve('./', clientHelpersDir, file);

    require(filePath)();
});

// init partials
var templatesDirName = path.basename(templatesDir);
file.walkSync(templatesDir, function(dirPath, dirs, files) {
    var relPath = dirPath.replace(templatesDir, '');

    files.forEach(function (file) {
        var relFilePath = path.join(templatesDirName, relPath, path.basename(file, '.hbs')),
            templateRaw = fs.readFileSync(path.join(dirPath, file), "utf8"),
            template = handlebars.compile(templateRaw.toString());

        hbs.registerPartial(relFilePath.replace( /\//g , '_'), template);
    });
});

module.exports = app;