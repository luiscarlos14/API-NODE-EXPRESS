const express = require('express');
const app = require('../app');
const router = express.Router();
const mysql =  require("../mysql").pool;

router.get('/', (req, res, next)=>{

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

router.post('/', (req, res, next) =>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'INSERT INTO plantacao (plant_usuario, plant_praga, desc_plantio, data_plantio, praga) VALUES (?,?,?,?,?)',
            [req.body.plant_usuario, req.body.plant_praga, req.body.desc_plantio, req.body.data_plantio, req.body.praga],
            
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

router.patch('/', (req, res, next) =>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'UPDATE plantacao SET plant_usuario = ?, plant_praga = ?, desc_plantio = ?, data_plantio = ?, praga = ? WHERE id_plantacao = ?',             
            [req.body.plant_usuario, req.body.plant_praga,req.body.desc_plantio, req.body.data_plantio, req.body.praga, req.body.id_plantacao],
            
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
            'DELETE FROM plantacao WHERE id_plantacao = ?',             
            [req.body.id_plantacao],
            
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