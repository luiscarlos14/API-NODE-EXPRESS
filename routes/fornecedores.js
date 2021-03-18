const express = require('express');
const app = require('../app');
const router = express.Router();
const mysql =  require("../mysql").pool;

router.get('/', (req, res, next)=>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error }) }

        conn.query(
            'SELECT * FROM fornecedor;',
            
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
            'INSERT INTO fornecedor (produtos, nome, email, telefone, cnpj, endereco) VALUES (?,?,?,?,?,?)',
            [req.body.produtos, req.body.nome,req.body.email, req.body.telefone, req.body.cnpj, req.body.endereco],
            
            (error, result, field) => {
                conn.release();

                if(error){
                  return  res.status(500).send({
                        error: error,
                        response: null
                    });
                } 
                res.status(201).send({
                    mensagem : 'Fornecedor Inserido com sucesso!',
                    id_fornecedor : result.insertId
                });
            }
        )

    });

});

router.patch('/', (req, res, next) =>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'UPDATE fornecedor SET produtos = ?, nome = ?, email = ?, telefone = ?, cnpj = ?, endereco = ? WHERE id_fornecedor = ?',             
            [req.body.produtos, req.body.nome, req.body.email, req.body.telefone, req.body.cnpj, req.body.endereco, req.body.id_fornecedor],
            
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
            'DELETE FROM fornecedor WHERE id_fornecedor = ?',             
            [req.body.id_fornecedor],
            
            (error, result, field) => {
                conn.release();

                if(error){
                  return  res.status(500).send({
                        error: error,
                        response: null
                    });
                } 
                res.status(202).send({
                    mensagem : 'Fornecedor removido com sucesso!'
                });
            }
        )

    });

});

module.exports = router;