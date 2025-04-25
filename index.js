const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Decentralized NLP Bot API is running.');
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

app.post('/upload', upload.single('pdf'), (req, res) => {
  const filePath = req.file.path;
  res.json({ success: true, message: 'PDF uploaded and ready for processing.', file: filePath });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
