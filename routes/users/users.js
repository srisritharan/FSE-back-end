import express from "express";
import { client, dbConnect } from './db.js';
const dbName = 'usersdb';
const collectionName = 'users';
dbConnect(); // Connect to MongoDB

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const prj = { user: 1, email: 1, _id: 0 };
        const users = await collection.find({}).project(prj).toArray();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/authenticate', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const loginRequest = req.body;
        const userFound = await collection.findOne({ "user": loginRequest.user });
        if (!userFound) {
            res.status(401).send("Unauthorized: user not found");
        } else if (userFound.password === loginRequest.password) {
            res.status(200).send("User logged in successfully!");
        } else {
            res.status(401).send("Unauthorized: password incorrect for user");
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;