require('dotenv').config()

// Require certain env vars
;[
  'DATABASE_URL',
].forEach(envVarName => {
  if (!process.env[envVarName]) {
    throw new Error(`${envVarName} is not set`)
  }
})

// Connections
exports.DATABASE_URL = process.env.DATABASE_URL

// Server
exports.PORT = parseInt(process.env.PORT || '', 10) || 3001
