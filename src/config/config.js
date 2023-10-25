const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path: path.join(__dirname, '../../.config/.env-dev')})

const config = {
    port: process.env.PORT || 8443, // default
    hostname: process.env.HOSTNAME || 'localhost',
    mongoUri: process.env.MONGO_URI || 'mongodb://dev-node-project-101:DevnodeProj3ct1o1@localhost:27017/Devnode-project-101?authSource=dev-node-project-101',
    JWTsecret: process.env.SECRET || '0AA4C2390E3C2513D8297FE8FA56C35E545E2849FB32103C',
    headerOrigin: process.env.origin || '*',
    headerMethod: process.env.METHOD || 'GET,POST'
    
}

module.exports = config