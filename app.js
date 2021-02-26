const express = require('express');
const app = express();
const morgan = require('morgan');
//monitorar todos os métodos

const rotaVendas = require('./routes/vendas');
// const rotaUsuarios = require('./routes/usuarios');
// const rotaProdutos = require('./routes/produtos');
// const rotaPragas = require('./routes/pragas');
// const rotaPlantacoes = require('./routes/plantacoes');
// const rotaInsumos = require('./routes/insumos');
// const rotaInseticidas = require('./routes/inseticidas');
// const rotaFuncionarios = require('./routes/funcionarios');
// const rotaFornecedores = require('./routes/fornecedores');
// const rotaDespesas = require('./routes/despesas');
// const rotaColheitas = require('./rougit tes/colheitas');

app.use(morgan('dev'));
//inicia o serviço

app.use('/vendas', rotaVendas);
// app.use('/usuarios', rotaUsuarios);
// app.use('/produtos', rotaProdutos);
// app.use('/pragas', rotaPragas);
// app.use('/plantacoes', rotaPlantacoes);
// app.use('/insumos', rotaInsumos);
// app.use('/inseticidas', rotaInseticidas);
// app.use('/funcionarios', rotaFuncionarios);
// app.use('/fornecedores', rotaFornecedores);
// app.use('/despesas', rotaDespesas);
// app.use('/colheitas', rotaColheitas);

//Respostas de erros (Caso não entre em nenhuma rota acima)
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status(404);
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;