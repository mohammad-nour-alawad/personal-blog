const bcrypt = require('bcrypt');

// Hashing a password during registration
const hashPassword = async (password) => {
    const saltRounds = 10; // or another number you prefer
    return await bcrypt.hash(password, saltRounds);
};

// Comparing a password during login
const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

module.exports = { hashPassword, comparePassword };