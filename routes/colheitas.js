const express = require('express');
const app = require('../app');
const router = express.Router();
const mysql =  require("../mysql").pool;
const protected = require('../middleware/protected');

router.get('/', protected.obrigatorio, (req, res, next)=>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error }) }

        conn.query(
            'SELECT * FROM colheita;',
            
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
            'INSERT INTO colheita (plant_usuario, func_colheita, desc_colheita, qtd_colheita, uni_colheita, data_colheita) VALUES (?,?,?,?,?,?)',
            [req.body.plant_usuario, req.body.func_colheita, req.body.desc_colheita, req.body.qtd_colheita, req.body.uni_colheita, req.body.data_colheita],
            
            (error, result, field) => {
                conn.release();

                if(error){
                  return  res.status(500).send({
                        error: error,
                        response: null
                    });
                } 
                res.status(201).send({
                    mensagem : 'Colheita inserida com sucesso!',
                    id_colheita : result.insertId
                });
            }
        )

    });

});

router.patch('/', protected.obrigatorio, (req, res, next) =>{

    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'UPDATE colheita SET func_colheita = ?, desc_colheita = ?, qtd_colheita = ?, uni_colheita = ?, data_colheita = ? WHERE id_colheita = ?',             
            [req.body.func_colheita, req.body.desc_colheita, req.body.qtd_colheita, req.body.uni_colheita, req.body.data_colheita, req.body.id_colheita],
            
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

router.delete('/', protected.obrigatorio, (req, res, next) => {
    mysql.getConnection((error, conn) =>{

        if(error){ return res.status(500).send({ error : error });}

        conn.query(
            'DELETE FROM colheita WHERE id_colheita = ?',             
            [req.body.id_colheita],
            
            (error, result, field) => {
                conn.release();

                if(error){
                  return  res.status(500).send({
                        error: error,
                        response: null
                    });
                } 
                res.status(202).send({
                    mensagem : 'Colheita removida com sucesso!'
                });
            }
        )

    });

});

module.exports = router;