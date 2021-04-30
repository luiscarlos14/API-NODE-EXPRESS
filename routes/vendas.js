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
            'INSERT INTO vendas (usuario_venda, desc_venda, data_venda, desc_comprador, qtd_venda, valor_venda, num_pedido, uni_venda) VALUES (?,?,?,?,?,?,?,?)',
            [req.body.usuario_venda,req.body.desc_venda, req.body.data_venda, req.body.desc_comprador, req.body.qtd_venda, req.body.valor_venda, req.body.num_pedido, req.body.uni_venda],
            
            (error, result, field) => {
                conn.release();

                if(error){
                  return  res.status(500).send({
                        error: error,
                        response: null
                    });
                } 
                res.status(201).send({
                    mensagem : 'Venda adicionada com sucesso!'
                });
            }
        )

    });

});

router.patch('/', protected.obrigatorio, (req, res, next) =>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'UPDATE vendas SET desc_venda = ?, desc_comprador = ?, data_venda = ?, qtd_venda = ?, valor_venda = ?, num_pedido = ?, uni_venda = ? WHERE id_vendas = ?',   

            [req.body.desc_venda, req.body.desc_comprador, req.body.data_venda, req.body.qtd_venda, req.body.valor_venda, req.body.num_pedido, req.body.uni_venda, req.body.id_vendas],
            
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
            'DELETE FROM vendas WHERE id_vendas = ?',             
            [req.body.id_vendas],
            
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