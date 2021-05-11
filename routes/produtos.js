const express = require('express');
const app = require('../app');
const router = express.Router();
const mysql =  require("../mysql").pool;
const protected = require('../middleware/protected');

router.get('/', protected.obrigatorio, (req, res, next)=>{

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

router.post('/', protected.obrigatorio, (req, res, next) =>{

    console.log(req.usuario);

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'INSERT INTO produto (usuario, fornecedor, descricao, valor, quantidade, unidade) VALUES (?,?,?,?,?,?)',
            [req.body.usuario, req.body.fornecedor,req.body.descricao, req.body.valor, req.body.quantidade, req.body.unidade],
            
            (error, result, field) => {
                conn.release();

                if(error){
                  return  res.status(500).send({
                        error: error,
                        response: null
                    });
                } 
                res.status(201).send({
                    mensagem : 'Produto inserido com sucesso!',
                    id_produto: result.insertId
                });
            }
        )

    });

});

router.patch('/', protected.obrigatorio, (req, res, next) =>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'UPDATE produto SET descricao = ?, valor = ?, quantidade = ?, unidade = ? WHERE id = ?',             
            [req.body.descricao, req.body.valor, req.body.quantidade,req.body.unidade, req.body.id],
            
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
            'DELETE FROM produto WHERE id = ?',             
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
                    mensagem : 'Produto removido com sucesso!'
                });
            }
        )

    });

});

module.exports = router;