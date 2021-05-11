const express = require('express');
const app = require('../app');
const router = express.Router();
const mysql =  require("../mysql").pool;
const protected = require('../middleware/protected');

router.get('/', protected.obrigatorio, (req, res, next)=>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error }) }

        conn.query(
            'SELECT * FROM plantacao;',
            
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
            'INSERT INTO plantacao (usuario, praga, descricao, data) VALUES (?,?,?,?)',
            [req.body.usuario, req.body.praga, req.body.descricao, req.body.data],
            
            (error, result, field) => {
                conn.release();

                if(error){
                  return  res.status(500).send({
                        error: error,
                        response: null
                    });
                } 
                res.status(201).send({
                    mensagem : 'Plantação inserida com sucesso!',
                    id_plantacao : result.insertId
                });
            }
        )

    });

});

router.patch('/', protected.obrigatorio, (req, res, next) =>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'UPDATE plantacao SET usuario = ?, praga = ?, descricao = ?, data = ? WHERE id = ?',             
            [req.body.usuario, req.body.praga, req.body.descricao, req.body.data, req.body.id],
            
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
            'DELETE FROM plantacao WHERE id = ?',             
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
                    mensagem : 'Plantação removida com sucesso!'
                });
            }
        )

    });

});

module.exports = router;