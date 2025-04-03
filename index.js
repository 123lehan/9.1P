const express = require('express');
const app = express();
const port = 3000;

// Addition
app.get('/add', (req, res) => {
    const { num1, num2 } = req.query;

// Check if both parameters are provided

if (!num1 || !num2) {
    return res.status(400).send("Error: Missing parameters. Please provide num1 and num2.");
}

const result = Number(num1) + Number(num2);
res.send(`Result: ${result}`)
});

// Subtraction
app.get('/subtract', (req, res) => {
  const { num1, num2 } = req.query;

  // Check if both parameters are provided
  if (!num1 || !num2) {
    return res.status(400).send("Error: Missing parameters. Please provide num1 and num2.");
  }

  // Check if both parameters are valid numbers
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send("Error: Both parameters must be valid numbers.");
  }

  const result = Number(num1) - Number(num2);
  res.send(`Result: ${result}`);
});

// Multiplication
app.get('/multiply', (req, res) => {
  const { num1, num2 } = req.query;

  // Check if both parameters are provided
  if (!num1 || !num2) {
    return res.status(400).send("Error: Missing parameters. Please provide num1 and num2.");
  }

  // Check if both parameters are valid numbers
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send("Error: Both parameters must be valid numbers.");
  }

  const result = Number(num1) * Number(num2);
  res.send(`Result: ${result}`);
});

// Division
app.get('/divide', (req, res) => {
  const { num1, num2 } = req.query;

  // Check if both parameters are provided
  if (!num1 || !num2) {
    return res.status(400).send("Error: Missing parameters. Please provide num1 and num2.");
  }

  // Check if both parameters are valid numbers
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send("Error: Both parameters must be valid numbers.");
  }

  // Check for division by zero
  if (num2 == 0) {
    return res.status(400).send("Error: Division by zero is not allowed.");
  }

  const result = Number(num1) / Number(num2);
  res.send(`Result: ${result}`);
});

// Exponentiation
app.get('/exponentiate', (req, res) => {
  const { num1, num2 } = req.query;

  // Check if both parameters are provided
  if (!num1 || !num2) {
    return res.status(400).send("Error: Missing parameters. Please provide num1 and num2.");
  }

  // Check if both parameters are valid numbers
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send("Error: Both parameters must be valid numbers.");
  }

  const result = Math.pow(Number(num1), Number(num2));
  res.send(`Result: ${result}`);
});

// Square Root
app.get('/sqrt', (req, res) => {
  const { num1 } = req.query;

  // Check if the parameter is provided
  if (!num1) {
    return res.status(400).send("Error: Missing parameter. Please provide num1.");
  }

  // Check if the parameter is a valid number
  if (isNaN(num1)) {
    return res.status(400).send("Error: The parameter must be a valid number.");
  }

  if (num1 < 0) {
    return res.status(400).send("Error: Cannot calculate the square root of a negative number.");
  }

  const result = Math.sqrt(Number(num1));
  res.send(`Result: ${result}`);
});

// Modulo
app.get('/modulo', (req, res) => {
  const { num1, num2 } = req.query;

  // Check if both parameters are provided
  if (!num1 || !num2) {
    return res.status(400).send("Error: Missing parameters. Please provide num1 and num2.");
  }

  // Check if both parameters are valid numbers
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send("Error: Both parameters must be valid numbers.");
  }

  const result = Number(num1) % Number(num2);
  res.send(`Result: ${result}`);
});

// Handle unsupported operations (catch-all route)
app.get('*', (req, res) => {
  res.status(404).send("Error: Unsupported operation. Please check the API documentation for valid endpoints.");
});

// Global error handler (catch unexpected errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong! Please try again later.");
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Calculator microservice is running on http://localhost:${port}`);
  });
  