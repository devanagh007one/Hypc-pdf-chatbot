# Decentralized NLP Bot

This is a Node.js-based decentralized NLP chatbot server with Docker support. It allows PDF uploads for future parsing and NLP processing.

## Features

- Express.js server
- PDF upload endpoint (`/upload`)
- Multer-based file upload handler
- Dockerized for easy deployment

## Project Structure

```
decentralized-nlp-bot/
├── Dockerfile
├── index.js
├── package.json
├── README.md
└── uploads/         # For storing uploaded PDFs
```

## Usage

### 1. Local Development

```bash
npm install
npm start
```

Server will run on `http://localhost:3000`

### 2. Docker

To build and run using Docker:

```bash
docker build -t decentralized-nlp-bot .
docker run -p 3000:3000 decentralized-nlp-bot
```

### 3. Uploading PDF

Use a tool like Postman or cURL:

```bash
curl -F 'pdf=@yourfile.pdf' http://localhost:3000/upload
```

## Endpoints

- `GET /` – Health check
- `POST /upload` – Upload a PDF file
