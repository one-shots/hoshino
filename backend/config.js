require('dotenv').config()

// Server
exports.PORT = parseInt(process.env.PORT || '', 10) || 3001
