const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const nlp = require('./nlp');
const authMiddleware = require('./authMiddleware');

const app = express();
const PORT = 3000;
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

app.get('/manifest.json', (req, res) => {
  res.sendFile(__dirname + '/manifest.json');
});

app.post('/upload', authMiddleware(2), upload.single('pdf'), async (req, res) => {
  const fileBuffer = fs.readFileSync(req.file.path);
  const parsed = await pdfParse(fileBuffer);

  nlp.loadText(parsed.text);
  res.json({ message: 'PDF processed and NLP ready.' });
});

app.post('/ask', authMiddleware(1), (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'Missing question' });

  const answer = nlp.ask(question);
  res.json({ answer });
});

app.listen(PORT, () => {
  console.log(`PDF Chatbot running at http://localhost:${PORT}`);
});