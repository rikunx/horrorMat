const app = require('./app');

/**
 * Returns all the routers that contain routes that should be publicly accessible.
 * @returns {Router[]} Array of of routers that will be applied as middleware.
 */
function open(db) {
    return [app(db)];
}

exports.open = open;