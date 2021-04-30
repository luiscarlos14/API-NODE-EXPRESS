const express = require('express');
const app = require('../app');
const router = express.Router();
const mysql =  require("../mysql").pool;
const bcrypt = require('bcrypt');
const token = require('jsonwebtoken');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) =>{

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error : error}) }
        const query = 'SELECT * FROM usuario WHERE email = ?';

        conn.query(query,[req.body.email],(error, results, fields) => {
            conn.release();

            if(error) { return res.status(500).send({error : error}) }

            if(results.length < 1){
                return res.status(401).send({mensagem: 'Falha na autenticação!'})
            }

            bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {

                const pass = bcrypt.compare(req.body.senha, results[0].senha);
                
                if (err){
                    return res.status(401).send({mensagem: 'Falha na autenticação!'})
                }

                if (result){
                    const token = jwt.sign({
                        id_usuario: results[0].id_usuario,
                        email: results[0].email 
                    }, 
                    process.env.JWT_KEY, 
                    {
                        expiresIn: "24h"
                    });

                    return res.status(200).send({
                        valido: true,
                        token: token
                    });

                }

                return res.status(401).send({valido: false})
            });
        });
    });
})

module.exports = router;


