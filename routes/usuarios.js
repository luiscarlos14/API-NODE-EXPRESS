const express = require('express');
const app = require('../app');
const router = express.Router();
const mysql =  require("../mysql").pool;
const bcrypt = require('bcrypt');

router.get('/', (req, res, next)=>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error }) }

        conn.query(
            'SELECT * FROM usuario;',
            
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

        conn.query('SELECT * FROM usuario WHERE email = ?', [req.body.email], (error, results) => {

            if(error){

                return  res.status(500).send({
                      error: error,
                      response: null
                  })}

            if(results.length > 0){

                res.status(401).send({
                    mensagem:'E-mail já cadastrado!'
                })

            }

            else{
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) =>{

                    if (errBcrypt){
                        return res.status(500).send({ error : errBcrypt })
                    }
        
                    conn.query(
                        'INSERT INTO usuario (cpf, nome, email, senha, localidade) VALUES (?,?,?,?,?)',
                        [req.body.cpf, req.body.nome, req.body.email, hash, req.body.localidade],
                        
                        (error, result, field) => {
                            conn.release();
            
                            if(error){
                              return  res.status(500).send({
                                    error: error,
                                    response: null
                                });
                            } 
                            res.status(201).send({
                                mensagem : 'Usuário inserido com sucesso!',
                                id_usuario : result.insertId
                            });
                        }
                    )
        
                });
            }
        })

        

    });

});

router.patch('/', (req, res, next) =>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'UPDATE usuario SET nome = ?, email = ?, senha = ?, localidade = ? WHERE id_usuario = ?',             
            [req.body.nome, req.body.email, req.body.senha, req.body.localidade, req.body.id_usuario],
            
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
            'DELETE FROM usuario WHERE id_usuario = ?',             
            [req.body.id_usuario],
            
            (error, result, field) => {
                conn.release();

                if(error){
                  return  res.status(500).send({
                        error: error,
                        response: null
                    });
                } 
                res.status(202).send({
                    mensagem : 'Usuário removido com sucesso!'
                });
            }
        )

    });

});

module.exports = router;