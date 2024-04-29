import express from "express";
import fs from 'fs';
import log from '../../utils/log.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = fs.readFileSync('queries.json', 'utf8');
        res.status(200).send(data);
    } catch (err) {
        if (res.status){
            log(err);
        }
        res.status(404).send("queries.json file not found");
    }
});

router.post('/', (req, res) => {
    const queryArray = req.body;
    const data = JSON.stringify(queryArray, null, 2); // Indent with 2 spaces
    try {
        fs.writeFileSync('queries.json', data);
        log('query array saved to queries.json');
        res.status(200).send("query saved");
    } catch (err) {
        log(err);
        res.status(500).send(err);
    }
});

export default router;