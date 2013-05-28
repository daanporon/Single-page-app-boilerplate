process.env['APP_DIR'] = 'app';

var path = require('path'),
    connect = require('connect'),
    http = require('http'),
    base = path.resolve('dist'),
    app = require('./server/index');

app.set('port', process.env.PORT || 3000);

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.
app.use(function(req, res, next) {
    console.log('404: ' + req.url);

    res.status(404);
    res.render('errors/404', {
        title: '404'
    });
});

// Make empty directories browsable.
app.use(connect.directory(base));

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});