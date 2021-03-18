const express = require('express');
const app = require('../app');
const router = express.Router();
const mysql =  require("../mysql").pool;

router.get('/', (req, res, next)=>{

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

router.post('/', (req, res, next) =>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'INSERT INTO insumos (usuario_insumo, estoque, valor_estoque, desc_insumo, data_compra, data_validade, uni_insumos) VALUES (?,?,?,?,?,?,?)',
            [req.body.usuario_insumo, req.body.estoque, req.body.valor_estoque, req.body.desc_insumo, req.body.data_compra, req.body.data_validade, req.body.uni_insumos],
            
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

router.patch('/', (req, res, next) =>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'UPDATE insumos SET estoque = ?, valor_estoque = ?, desc_insumo = ?, data_compra = ?, data_validade = ?, uni_insumos = ? WHERE id_insumo = ?',             
            [req.body.estoque, req.body.valor_estoque, req.body.desc_insumo, req.body.data_compra, req.body.data_validade, req.body.uni_insumos, req.body.id_insumo],
            
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
            'DELETE FROM insumos WHERE id_insumo = ?',             
            [req.body.id_insumo],
            
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