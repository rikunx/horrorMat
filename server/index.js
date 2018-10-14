/* eslint-disable no-console */
const path = require('path');

const http = require('http');
const express = require('express');
const compression = require('compression');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient

const routes = require('./routes');

const { staticServer } = require('../config');

/**
 * Sets up the static Express server
 * to serve the UI in a production setting.
 * @returns {HTTPListener} HTTP listener
 */
function setup() {
    const app = express();
    app.use(cors());
    app.use(compression());
    app.use(express.static(path.join(__dirname, '../', 'dist'), { maxAge: staticServer.maxAge }));
    app.use(express.static(path.join(__dirname, '../', 'media'), { maxAge: staticServer.maxAge }));

    MongoClient.connect('mongodb://0.0.0.0:27017', (err, client) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        const db = client.db('horror')
        app.use(routes.open(db));

        const listener = http.createServer(app);
        listener.listen(staticServer.port, staticServer.host, () =>
            console.log(`Static server listening on http://${staticServer.host}:${staticServer.port}`)
        );
    })
}

if (!module.parent) setup();