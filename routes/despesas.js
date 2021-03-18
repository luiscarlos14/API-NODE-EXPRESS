const express = require('express');
const app = require('../app');
const router = express.Router();
const mysql =  require("../mysql").pool;

router.get('/', (req, res, next)=>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error }) }

        conn.query(
            'SELECT * FROM despesas;',
            
            (error, result, fields) => {
                
                if(error){ return res.status(500).send({ error : error }) }

                return res.status(200).send({ response: result });
            }
        )
    });
});

router.post('/', (req, res, next) =>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'INSERT INTO despesas (usuario_despesa, desc_despesa, data_despesa, valor_despesa, despesa_paga) VALUES (?,?,?,?,?)',
            [req.body.usuario_despesa, req.body.desc_despesa, req.body.data_despesa, req.body.valor_despesa, req.body.despesa_paga],
            
            (error, result, field) => {
                conn.release();

                if(error){
                  return  res.status(500).send({
                        error: error,
                        response: null
                    });
                } 
                res.status(201).send({
                    mensagem : 'Despesa inserida com sucesso!',
                    id_despesas : result.insertId
                });
            }
        )

    });

});

router.patch('/', (req, res, next) =>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'UPDATE despesas SET desc_despesa = ?, data_despesa = ?, valor_despesa = ?, despesa_paga = ? WHERE id_despesas = ?',             
            [req.body.desc_despesa, req.body.data_despesa, req.body.valor_despesa, req.body.despesa_paga, req.body.id_despesas],
            
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

router.delete('/', (req, res, next) =>{
    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'DELETE FROM despesas WHERE id_despesas = ?',             
            [req.body.id_despesas],
            
            (error, result, field) => {
                conn.release();

                if(error){
                  return  res.status(500).send({
                        error: error,
                        response: null
                    });
                } 
                res.status(202).send({
                    mensagem : 'Despesa removida com sucesso!'
                });
            }
        )

    });

});

module.exports = router;

//Sempre retorna JSON

//nodemon atualiza automaticamente