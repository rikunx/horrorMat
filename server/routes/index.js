const app = require('./app');

/**
 * Returns all the routers that contain routes that should be publicly accessible.
 * @returns {Router[]} Array of of routers that will be applied as middleware.
 */
function open() {
    return [app()];
}

exports.open = open;
