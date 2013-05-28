var util = require('util'),
    path = require('path'),
    appDir = process.env['APP_DIR'] || 'app',
    config = require(path.resolve('./', appDir, 'scripts', 'resources', 'config', 'config'));

var AbstractError, NotFoundError, handleError;

AbstractError = function (msg, constr) {
  Error.captureStackTrace(this, constr || this)
  this.message = msg || 'Error'
};
util.inherits(AbstractError, Error);
AbstractError.prototype.name = 'Abstract Error';


NotFoundError = function (msg) {
  NotFoundError.super_.call(this, msg, this.constructor)
};
util.inherits(NotFoundError, AbstractError);
NotFoundError.prototype.message = 'Not Found Error';

handleError = function(err, req, res) {
    console.error(err);

    var statusCode;
    if (err instanceof NotFoundError) {
        statusCode = 404;
    } else {
        statusCode = 500;
    }

    res.status(statusCode);
    res.render('errors/' + statusCode, {
        status: statusCode,
        title: statusCode,
        ga: {
            code: config.gacode,
            pageUrl: '/' + statusCode + req.url.split('?')[0]
        }
    });
};


module.exports = {
    'NotFoundError': NotFoundError,
    'handleError': handleError
};