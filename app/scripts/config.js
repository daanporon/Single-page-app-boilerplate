require.config({

    baseUrl: '/scripts',

    deps: ["main"],

    hbs: {
        templateExtension : 'hbs',
        disableI18n: true,
        disableHelpers: false,
        helperDirectory: 'helpers/handlebars/'
    },

    paths: {
        // JavaScript folders.
        'vendor': 'vendor', // The 3rd-party javascript libraries
        'controllers': 'controllers', // The controllers
        'resources': 'resources', // Contains all the resources like translations, configs, ...
        'collections': 'collections', // Contains all the entity collections
        'templates': '../templates', // Contains all the handlebar templates
        'helpers/handlebars': 'helpers/handlebars', // Contains all the handlebar helpers

        // Libraries.
        'jquery': 'vendor/jquery-1.9.0.min',
        'director': 'vendor/director',
        'handlebars': 'vendor/handlebars-1.0.rc.3',
        'underscore': 'vendor/underscore',
        'underscore.string': 'vendor/underscore.string',
        'i18n': 'vendor/i18n',
        'hbs': 'vendor/hbs',

        // Aliases
        'appconfig': 'resources/config/config',
        'routing': 'resources/config/routing',
        'hbs/json2': 'vendor/json2',
        'hbs/i18nprecompile': 'vendor/i18nprecompile',
        'hbs/underscore': 'vendor/underscore'
    },

    shim: {
    }

});
