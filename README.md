Singlepage app boilerplate
===========================
I'm a backend programmer (Java/PHP) with lots of interests in Javascript. For my latest two projects i needed to develop a Sinlge page web application. I don't have many experience with using MVC frameworks as Ember, Angular or Backbone … but from what i knew of them they looked a bit too complex and too much magic for what i needed. So i started creating my own boilerplate for simple single page applications.

The first project was more basic then the second one .. so the boilerplates still evaluates everytime i use it. It's not realy finished and i think a lot of things can still improve. But i wanted to share what i've got for now and maybe get it better with some help.

## Features
These are a few requirements i wanted:

* Organized code with a logical file structure (Some MV* structure).
* Routing
* Easy templating
* Clean code without not much duplication and easy to maintain code.
* Rendering routes directly on the server so that persons without javascript can still use this and make it possible for crawlers to crawl the pages (SEO, OG).

### Organized code
To achieve this on the client-side i used [RequireJS](https://github.com/jrburke/requirejs) because it's very easy to structure you're code and keep your HTML clean. RequireJS also has an optimization tool which makes it possible to combine and minify your javascript. Also for my first project i had to deploy the application to 2 platforms. With RequireJS you have one config file where you can specify where everything is found. With this i could write a separate config file for each platform and it was possible to overwrite some javascript files. The two platforms has different specifications.

As directory structure i chose for the following:

* app
    * scripts
        * collections
        * controllers
        * helpers
        * resources
            * config
            * data
        * vendor
    * templates
* server
    * controllers
    * helpers
    * templates
    
The two main folders are app and server, the app is writen in javascript and is the client-side code. The server is writen in [Node.js](http://nodejs.org/) and contains the server-side code.

The collections folder contains collections of data with easy methods to access them. As you can see there are controllers on both the client-side and the server-side. These controllers contain methods which are c

collections. The vendor folder is used for storing third party scripts. Finaly you also have the templates folder both on the clinet and the server-side which stores the templates.

### Routing
I wanted to keep the routing as easy as possible. On the server-side it was easy to choose a good router i chose [Express](http://expressjs.com/). Express was easy to use and used in it is almost the standard to use … almost everyone who wants to create a web application using Node.js starts with Express. At the client-side i wanted to use a router which has more or less the same syntax as on the Express so i ended up with [Director](https://github.com/flatiron/director). Because both are using the same syntax i could create a config file for the routing which can be used both on the client and the server. So i created the routing.js config file which is located here app/scripts/resources/config/routing.js. 

Here it's possible to configure routes as follows:

    'path': '/:slug',
    'controller': 'pages',
    'action': 'show',
    'after': 'unloadShow'
    
`Path` is the route to use, in this route it's possible to use Url parameters by prefixing it with a :. `Controller` is the name of the controller to call if this route matches. In this controller the `action` function will be called. It's also possible to configure an action to be called when the page is unloaded at the client-side for example when another page is being called by configuring it in the `after` property.

### Templating
For the templating i used [Handlebars](http://handlebarsjs.com/) because it's based on [Mustache](http://mustache.github.io/) which i already used before and realy liked because of the simplicity. The templating language could also be used both on the server and the client. Another great feature of Handlebars is that it's extendable, so it's possible to write your own helpers which can be used from inside the templates.

### Clean and maintainable code
I did this by creating lots of helper functions which are easy to use and to reuse. A few of them are included in the boilerplate code.

One of the helpers i have written is the path helper which makes it possible to generate a path for a certain route. This way if something changes for a certain route i only had to make the adjustments in the routing.js file. Also this path helper can be used in the templates both on the server and client side as in the javascript and Node.js code.

    {{path 'page_path' slug}}
    pathHelper.generatePath('page_path', slug) 

Another helper is the analytics helper which makes it easy to track pages, events and social stuff.

For the routing there is also a router helper on the client-side which is a wrapper around the Director router. This router helper reads the routing.js config file and initialized everything.

There is also the client-side renderer helper, which is a wrapper around Handlebars which has a render and inject function. The inject function will check if the current route has already been rendered by the server and if so it won't be rendered for a second time by the client.

On the server-side i included two Handlebars helpers which are very usefull extend and block. I found these on the [hbs](https://github.com/donpark/hbs) plugin page which makes it easy to include Handlebars with RequireJs. An example can be found here: https://github.com/donpark/hbs/tree/master/examples/extend

### Rendering routes directly on the server
As explained earlier i use Node.JS on the server-side. Which is very usefull because it's also Javascript and this lets me reuse stuff both on the client and the server. For example the pathHelper, the templates, the routing configuration, the general configuration, … these are all shared between the client and the server.

## Getting started

The easiest way to get started is to install Git and clone the repository:

    git clone --q --depth 0 git@github.com:daanporon/Single-page-app-boilerplate.git myproject
    cd myproject
    rm -rf .git
    
When you installed this boilerplate you'll see there is some basic functionality available. I created an example controller, collection, data and routing file. You can start with looking at this to see how i used it.

## List of things i used
* [Node.JS](http://nodejs.org/)
* [Express](http://expressjs.com/)
* [Director](https://github.com/flatiron/director)
* [RequireJS](http://requirejs.org/)
* [Handlebars](http://handlebarsjs.com/)
* [jQuery](http://jquery.com/)
* [hbs](https://github.com/donpark/hbs) (handlebars plugin for RequireJS)
* [Underscore](http://underscorejs.org/)
* [Underscore.string](http://epeli.github.io/underscore.string/)

## Feedback
Feedback is always welcome on Twitter @daanporon or Pull Request.

## License
Copyright (c) 2013 Daan Poron (@daanporon)
Licensed under the MIT license.