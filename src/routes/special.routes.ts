import express from 'express';
const router = express.Router();

import passport from 'passport';

router.get('/special', passport.authenticate('jwt'), (req, res)=>{
    res.send('accediste a la ruta protegida')
})

export default router;