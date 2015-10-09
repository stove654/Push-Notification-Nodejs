/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {
    app.use('/api/images', require('./api/image'));
    app.use('/api/push', require('./api/push'));

};
