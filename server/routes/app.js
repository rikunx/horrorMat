const path = require('path');
const { Router } = require('express');

function appPage(req, res) {
    res.sendFile(path.join(process.env.STATIC_DIR, 'app.html'));
}

function appRoutes() {
    const router = new Router();
    router.route('/').get(appPage);
    return router;
}

module.exports = appRoutes;
