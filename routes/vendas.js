const express = require('express');
const app = require('../app');
const router = express.Router();
const mysql =  require('../mysql').pool;
const protected = require('../middleware/protected');

router.get('/', protected.obrigatorio, (req, res, next)=>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error }) }

        conn.query(
            'SELECT * FROM vendas;',
            
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
            'INSERT INTO vendas (usuario, descricao, data, comprador, quantidade, valor, numero, unidade, frequencia) VALUES (?,?,?,?,?,?,?,?,?)',
            [req.body.usuario, req.body.descricao, req.body.data, req.body.comprador, req.body.quantidade, req.body.valor, req.body.numero, req.body.unidade, req.body.frequencia],
            
            (error, result, field) => {
                conn.release();

                if(error){
                  return  res.status(500).send({
                        error: error,
                        response: null
                    });
                } 
                res.status(201).send({
                    mensagem : 'Venda adicionada com sucesso!',
                    id_venda: result.insertId
                });
            }
        )

    });

});

router.patch('/', protected.obrigatorio, (req, res, next) =>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'UPDATE vendas SET descricao = ?, comprador = ?, data = ?, quantidade = ?, valor = ?, numero = ?, unidade = ? WHERE id = ?',   

            [req.body.descricao, req.body.comprador, req.body.data, req.body.quantidade, req.body.valor, req.body.numero, req.body.unidade, req.body.id],
            
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
            'DELETE FROM vendas WHERE id = ?',             
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
                    mensagem : 'Remoção concluída com sucesso!'
                });
            }
        )

    });

});

module.exports = router;