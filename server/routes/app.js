const path = require('path');
const { Router } = require('express');
const { ObjectId } = require('mongodb');

function appRoutes(db) {
    const router = new Router();

    router.get('/characters', async(req, res) => {
        const characters = await db.collection('characters').find().toArray();
        res.json(characters);
    });

    router.post('/session', async(req, res) => {
        const sessions = await db.collection('sessions');
        const newSession = await sessions.insert({});
        res.json(newSession);
    });

    router.get('/session/:sessionId', async(req, res) => {
        const { sessionId } = req.params;
        const sessions = await db.collection('sessions').find({ "_id": new ObjectId(sessionId) }).toArray();
        const session = sessions[0];
        if (session)
            res.json(session);
        else
            res.status(400).send('Session does not exist!');
    });

    router.put('/session/:sessionId', async(req, res) => {
        const { sessionId } = req.params;
        const { characterId, sessionData } = req.body;
        try {
            delete sessionData._id;
            await db.collection('sessions').updateOne({ "_id": new ObjectId(sessionId) }, {
                $set: {
                    [characterId]: sessionData
                }
            });
            res.json({ done: true });
        } catch (error) {
            console.error(error);
            res.status(500).send('Oops');
        }
    });

    return router;
}

module.exports = appRoutes;