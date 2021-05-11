const express = require('express');
const app = require('../app');
const router = express.Router();
const mysql =  require("../mysql").pool;
const protected = require('../middleware/protected');

router.get('/', protected.obrigatorio, (req, res, next)=>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error }) }

        conn.query(
            'SELECT * FROM insumos;',
            
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
            'INSERT INTO insumos (usuario, estoque, valor, descricao, compra, validade, unidade) VALUES (?,?,?,?,?,?,?)',
            [req.body.usuario, req.body.estoque, req.body.valor, req.body.descricao, req.body.compra, req.body.validade, req.body.unidade],
            
            (error, result, field) => {
                conn.release();

                if(error){
                  return  res.status(500).send({
                        error: error,
                        response: null
                    });
                } 
                res.status(201).send({
                    mensagem : 'Insumo inserido com sucesso!',
                    id_insumo : result.insertId
                });
            }
        )

    });

});

router.patch('/', protected.obrigatorio, (req, res, next) =>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'UPDATE insumos SET estoque = ?, valor = ?, descricao = ?, compra = ?, validade = ?, unidade = ? WHERE id = ?',             
            [req.body.estoque, req.body.valor, req.body.descricao, req.body.compra, req.body.validade, req.body.unidade, req.body.id],
            
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
            'DELETE FROM insumos WHERE id = ?',             
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
                    mensagem : 'Insumo removido com sucesso!'
                });
            }
        )

    });

});

module.exports = router; 