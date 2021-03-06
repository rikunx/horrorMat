const { Router } = require('express');
const { ObjectId } = require('mongodb');

function appRoutes(db) {
  const router = new Router();

  router.get('/characters', async (_, res) => {
    const characters = await db
      .collection('characters')
      .aggregate([
        {
          $lookup: {
            from: 'inventory',
            localField: 'inventory.items',
            foreignField: 'name',
            as: 'inventory.items'
          }
        }
      ])
      .toArray();
    res.json(characters);
  });
  router.get('/assets', async (_, res) => {
    const assets = await db
      .collection('assets')
      .find()
      .toArray();
    res.json(assets);
  });
  router.get('/spells', async (_, res) => {
    const spells = await db
      .collection('spells')
      .find()
      .toArray();
    res.json(spells);
  });
  router.get('/artifacts', async (_, res) => {
    const artifacts = await db
      .collection('artifacts')
      .find()
      .toArray();
    res.json(artifacts);
  });
  router.get('/conditions', async (_, res) => {
    const conditions = await db
      .collection('conditions')
      .find()
      .toArray();
    res.json(conditions);
  });

  router.post('/session', async (req, res) => {
    const sessions = await db.collection('sessions');
    const newSession = await sessions.insertOne({});
    res.json({ insertedId: newSession.insertedId });
  });

  router.get('/session/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    const sessions = await db
      .collection('sessions')
      .find({ _id: new ObjectId(sessionId) })
      .toArray();
    const session = sessions[0];
    if (session) res.json(session);
    else res.status(400).send('Session does not exist!');
  });

  router.put('/session/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    const { characterId, sessionData } = req.body;
    try {
      delete sessionData._id;
      await db.collection('sessions').updateOne(
        { _id: new ObjectId(sessionId) },
        {
          $set: {
            [characterId]: sessionData
          }
        }
      );
      res.json({ done: true });
    } catch (error) {
      console.error(error);
      res.status(500).send('Oops');
    }
  });

  router.get('/roll', (req, res) => {
    const { dice } = req.query;
    const results = [];
    const sides = 6;
    for (let i = dice; i > 0; --i) {
      results.push(Math.floor(Math.random() * sides) + 1);
    }
    res.json({ results });
  });
  return router;
}

module.exports = appRoutes;
