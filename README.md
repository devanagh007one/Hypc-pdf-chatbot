# Node.js PDF Chatbot with Local NLP & HyperCycle Cost Headers

A lightweight API-only PDF chatbot using TF-IDF and cosine similarity. Built with:
- Node.js + Express
- PDF parsing
- NLP using `natural`
- Token-based auth and cost headers
- HyperCycle-compatible `/manifest.json`

## Setup

### Local

```bash
npm install
node app.js
```

### Docker

```bash
docker build -t pdf-chatbot .
docker run -p 3000:3000 pdf-chatbot
```

## API Endpoints

### `POST /upload`

- Headers:
  - `Authorization: secret-token-123`
  - `X-Hyper-Cost: 2`
- FormData:
  - `pdf`: file

### `POST /ask`

- Headers:
  - `Authorization: secret-token-123`
  - `X-Hyper-Cost: 1`
- JSON body:
```json
{
  "question": "What is the main topic?"
}
```

### `GET /manifest.json`

Returns metadata for HyperCycle agent discovery.

## License

MIT


docker build -t hypc-pdf-chatbot .
docker run -p 3000:3000 hypc-pdf-chatbot