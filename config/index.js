const config = {
    staticServer: {
        host: process.env.STATIC_SERVER_HOST || '0.0.0.0',
        port: process.env.STATIC_SERVER_PORT || 80,
        maxAge: process.env.STATIC_SERVER_MAX_AGE ?
            Number.parseInt(process.env.STATIC_SERVER_MAX_AGE, 10) : 1000 * 60 * 60 * 24 * 30, // Defaults to 30 days cache
        routes: {
            modules: 'modules'
        }
    },
    apiServer: {
        host: process.env.API_SERVER_HOST || '0.0.0.0',
        port: process.env.API_SERVER_PORT || 5555,
        api: process.env.API_SERVER_PATH || 'v1'
    },
    debug: process.env.APP_DEBUG !== undefined ? process.env.APP_DEBUG : true
};

/**
 * Gets a formatted Static Server URL for making fetch API requests.
 * Assumes the protocol being used by the current page is
 * what will be used when making the request to the Static Server (http or https)
 * @returns {String} Formatted URL.
 */
config.getStaticServerUrl = function getStaticServerUrl() {
    const { host, port } = config.staticServer;
    const nonstandardPort = port !== 80 && port !== 443;
    return `//${host}${nonstandardPort ? ':' : ''}${nonstandardPort ? port : ''}`;
};
/**
 * Gets a formatted API URL for listening for socket data.
 * Assumes the protocol being used by the current page is
 * what will be used when making the request to the API (http or https)
 * @returns {String} Formatted URL.
 */
config.getAPIServerUrl = function getAPIServerUrl() {
    const { host, port, api } = config.apiServer;
    return `//${host}:${port}/${api}`;
};

module.exports = config;