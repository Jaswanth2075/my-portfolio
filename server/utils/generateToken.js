const jwt = require('jsonwebtoken');

const generateToken = (id, role = 'admin') => {
  const secret = process.env.JWT_SECRET || 'dev_jwt_secret_portfolio_key_98765';
  const expiresIn = process.env.JWT_EXPIRE || '7d';

  return jwt.sign({ id, role }, secret, {
    expiresIn
  });
};

module.exports = generateToken;
