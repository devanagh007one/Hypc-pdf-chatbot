const VALID_TOKENS = {
  'secret-token-123': { tier: 'paid', cost: 1 }
};

function authMiddleware(requiredCost) {
  return function (req, res, next) {
    const token = req.headers['authorization'];
    const costHeader = parseInt(req.headers['x-hyper-cost']);

    if (!token || !VALID_TOKENS[token]) {
      return res.status(401).json({ error: 'Invalid or missing token' });
    }

    if (!costHeader || costHeader < requiredCost) {
      return res.status(403).json({ error: 'Insufficient cost header' });
    }

    next();
  };
}

module.exports = authMiddleware;