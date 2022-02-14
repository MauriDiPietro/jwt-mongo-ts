export default {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    DB: {
        MONGOURI: process.env.MONGOURI || 'mongodb://localhost:27017/jwt',
        USER: process.env.USER,
        PASSWORD: process.env.PASSWORD
    }
}