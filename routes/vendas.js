const express = require('express');
const app = require('../app');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).send({
        mensagem: 'Retorna os dados referente ao banco de dados.'
    })
});

module.exports = router;

//Sempre retorna JSON

//nodemon atualiza automaticamente