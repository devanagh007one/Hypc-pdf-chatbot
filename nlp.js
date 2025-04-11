const natural = require('natural');
const sw = require('stopword');
const cosineSimilarity = require('cosine-similarity');

function preprocess(text) {
  return sw.removeStopwords(
    text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/)
  ).map(natural.PorterStemmer.stem);
}

class NLPProcessor {
  constructor() {
    this.sentences = [];
    this.vectors = [];
    this.vocab = new Set();
    this.tfidf = new natural.TfIdf();
  }

  loadText(text) {
    this.sentences = text.split('.').filter(s => s.length > 5);
    this.vocab = new Set();
    this.tfidf = new natural.TfIdf();

    this.sentences.forEach((s, i) => {
      const tokens = preprocess(s);
      tokens.forEach(t => this.vocab.add(t));
      this.tfidf.addDocument(tokens, i.toString());
    });

    const vocabArr = Array.from(this.vocab);
    this.vectors = this.sentences.map((_, i) =>
      vocabArr.map(word => this.tfidf.tfidf(word, i))
    );
    this.vocabArr = vocabArr;
  }

  ask(question) {
    const qTokens = preprocess(question);
    const qVec = this.vocabArr.map(
      word => qTokens.filter(t => t === word).length
    );

    let bestScore = -1;
    let bestSentence = 'Sorry, no good match found.';

    this.vectors.forEach((vec, idx) => {
      const score = cosineSimilarity(qVec, vec);
      if (score > bestScore) {
        bestScore = score;
        bestSentence = this.sentences[idx];
      }
    });

    return bestSentence;
  }
}

module.exports = new NLPProcessor();