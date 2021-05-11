const express = require('express');
const app = require('../app');
const router = express.Router();
const mysql =  require("../mysql").pool;
const protected = require('../middleware/protected');

router.get('/', protected.obrigatorio, (req, res, next)=>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error }) }

        conn.query(
            'SELECT * FROM pragas;',
            
            (error, result, fields) => {
                
                if(error){ return res.status(500).send({ error : error }) }

                return res.status(200).send({ response: result });
            }
        )
    });
});

router.post('/', protected.obrigatorio, (req, res, next) =>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'INSERT INTO pragas (inseticida, descricao, identificada, combatida) VALUES (?,?,?,?)',
            [req.body.inseticida, req.body.descricao, req.body.identificada, req.body.combatida],
            
            (error, result, field) => {
                conn.release();

                if(error){
                  return  res.status(500).send({
                        error: error,
                        response: null
                    });
                } 
                res.status(201).send({
                    mensagem : 'Praga adicionada ao sistema com sucesso!'
                });
            }
        )

    });

});

router.patch('/', protected.obrigatorio, (req, res, next) =>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'UPDATE pragas SET inseticida = ?, descricao = ?, identificada = ?, combatida = ? WHERE id = ?',             
            [req.body.inseticida, req.body.descricao, req.body.identificada, req.body.combatida, req.body.id],
            
            (error, result, field) => {
                conn.release();

                if(error){
                  return  res.status(500).send({
                        error: error,
                        response: null
                    });
                } 
                res.status(202).send({
                    mensagem : 'Alteração concluída com sucesso!'
                });
            }
        )

    });

});

router.delete('/', protected.obrigatorio, (req, res, next) =>{
    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'DELETE FROM pragas WHERE id = ?',             
            [req.body.id],
            
            (error, result, field) => {
                conn.release();

                if(error){
                  return  res.status(500).send({
                        error: error,
                        response: null
                    });
                } 
                res.status(202).send({
                    mensagem : 'Praga removida com sucesso!'
                });
            }
        )

    });

});

module.exports = router;