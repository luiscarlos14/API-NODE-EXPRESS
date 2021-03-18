const express = require('express');
const app = require('../app');
const router = express.Router();
const mysql =  require("../mysql").pool;

router.get('/', (req, res, next)=>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error }) }

        conn.query(
            'SELECT * FROM produto;',
            
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
            'INSERT INTO produto (usuario_produto, fornec_produto, desc_produto, valor_produto, qtd_produto, uni_produto) VALUES (?,?,?,?,?,?)',
            [req.body.usuario_produto, req.body.fornec_produto,req.body.desc_produto, req.body.valor_produto, req.body.qtd_produto, req.body.uni_produto],
            
            (error, result, field) => {
                conn.release();

                if(error){
                  return  res.status(500).send({
                        error: error,
                        response: null
                    });
                } 
                res.status(201).send({
                    mensagem : 'produto inserido com sucesso!'
                });
            }
        )

    });

});

router.patch('/', (req, res, next) =>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'UPDATE produto SET desc_produto = ?, valor_produto = ?, qtd_produto = ?, uni_produto = ? WHERE id_produto = ?',             
            [req.body.desc_produto, req.body.valor_produto, req.body.qtd_produto,req.body.uni_produto, req.body.id_produto],
            
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
            'DELETE FROM produto WHERE id_produto = ?',             
            [req.body.id_produto],
            
            (error, result, field) => {
                conn.release();

                if(error){
                  return  res.status(500).send({
                        error: error,
                        response: null
                    });
                } 
                res.status(202).send({
                    mensagem : 'Produto removido com sucesso!'
                });
            }
        )

    });

});

module.exports = router;