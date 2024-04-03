require('dotenv').config()
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export default {
    port: parseInt(process.env.PORT) || 9876,
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    api: {
        prefix: '/api',
    },
}
