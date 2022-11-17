//express
import express from 'express';
//router
const router = express.Router();

router.get('/', (req,res) => {
    res.send("DESDE API/VETERINARIOS");
});

router.get('/login', (req,res) => {
    res.send("DESDE API/VETERINARIOS/LOGIN");
});


export default router;