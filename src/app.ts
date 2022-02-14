import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()
import authRoutes from './routes/auth.routes';
import specialRoutes from './routes/special.routes';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(authRoutes);
app.use(specialRoutes);
app.use(passport.initialize());
passport.use(passportMiddleware)

app.get('/', (req, res)=>{
    res.send(`the api is at ${app.get('port')}`)
});



export default app;