const path = require('path');
const { Router } = require('express');

function appPage(req, res) {
    res.sendFile(path.join(process.env.STATIC_DIR, 'app.html'));
}

function appRoutes(db) {
    const router = new Router();
    router.route('/').get(appPage);

    router.route('/characters').get(async(req, res) => {
        const characters = await db.collection('characters').find().toArray();
        res.json(characters);
    });

    return router;
}

module.exports = appRoutes;