const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 3000;

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(mongoUri);

let historyCollection;

async function connectToMongo() {
    try {
        await client.connect();
        const db = client.db('calculator');
        historyCollection = db.collection('history');
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
}

async function logToMongo(operation, num1, num2, result) {
    if (historyCollection) {
        await historyCollection.insertOne({
            timestamp: new Date(),
            operation,
            num1: Number(num1),
            num2: num2 !== undefined ? Number(num2) : null,
            result
        });
    }
}

// --- Operations ---

app.get('/add', async (req, res) => {
    const { num1, num2 } = req.query;
    if (!num1 || !num2) return res.status(400).send("Missing num1 or num2");
    const result = Number(num1) + Number(num2);
    await logToMongo('add', num1, num2, result);
    res.send(`Result: ${result}`);
});

app.get('/subtract', async (req, res) => {
    const { num1, num2 } = req.query;
    if (!num1 || !num2 || isNaN(num1) || isNaN(num2))
        return res.status(400).send("Invalid or missing inputs");
    const result = Number(num1) - Number(num2);
    await logToMongo('subtract', num1, num2, result);
    res.send(`Result: ${result}`);
});

app.get('/multiply', async (req, res) => {
    const { num1, num2 } = req.query;
    if (!num1 || !num2 || isNaN(num1) || isNaN(num2))
        return res.status(400).send("Invalid or missing inputs");
    const result = Number(num1) * Number(num2);
    await logToMongo('multiply', num1, num2, result);
    res.send(`Result: ${result}`);
});

app.get('/divide', async (req, res) => {
    const { num1, num2 } = req.query;
    if (!num1 || !num2 || isNaN(num1) || isNaN(num2) || Number(num2) === 0)
        return res.status(400).send("Invalid or missing inputs / division by zero");
    const result = Number(num1) / Number(num2);
    await logToMongo('divide', num1, num2, result);
    res.send(`Result: ${result}`);
});

app.get('/exponentiate', async (req, res) => {
    const { num1, num2 } = req.query;
    if (!num1 || !num2 || isNaN(num1) || isNaN(num2))
        return res.status(400).send("Invalid or missing inputs");
    const result = Math.pow(Number(num1), Number(num2));
    await logToMongo('exponentiate', nu1, num2, result);
    res.send(`Result: ${result}`);
});

app.get('/sqrt', async (req, res) => {
    const { num1 } = req.query;
    if (!num1 || isNaN(num1) || Number(num1) < 0)
        return res.status(400).send("Invalid or missing input");
    const result = Math.sqrt(Number(num1));
    await logToMongo('sqrt', num1, null, result);
    res.send(`Result: ${result}`);
});

app.get('/modulo', async (req, res) => {
    const { num1, num2 } = req.query;
    if (!num1 || !num2 || isNaN(num1) || isNaN(num2))
        return res.status(400).send("Invalid or missing inputs");
    const result = Number(num1) % Number(num2);
    await logToMongo('modulo', num1, num2, result);
    res.send(`Result: ${result}`);
});

// 🆕 GET /history
app.get('/history', async (req, res) => {
    if (!historyCollection) return res.status(500).send("Database not connected");
    const history = await historyCollection.find().sort({ timestamp: -1 }).toArray();
    res.json(history);
});

// Catch-all for unsupported endpoints
app.get('*', (req, res) => {
    res.status(404).send("Error: Unsupported operation. Please check the API documentation for valid endpoints.");
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong! Please try again later.");
});

// Start server and connect to DB
app.listen(port, '0.0.0.0', async () => {
    await connectToMongo();
    console.log(`🚀 Calculator API running at http://localhost:${port}`);
});
