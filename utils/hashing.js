const { hash, compare } = require("bcryptjs");

exports.doHash = (value, saltValue) => {
  return hash(value, saltValue);
};

exports.doHashValidation = (value, hashedValue) => {
  return compare(value, hashedValue);
};  