// Simple validation & sanitization helpers

const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.trim();
};

module.exports = {
  isValidEmail,
  sanitizeString
};
