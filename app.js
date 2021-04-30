const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const cors = require('cors');
app.use(cors());

const rotaVendas = require('./routes/vendas');
const rotaUsuarios = require('./routes/usuarios');
const rotaProdutos = require('./routes/produtos');
const rotaPragas = require('./routes/pragas');
const rotaPlantacoes = require('./routes/plantacoes');
const rotaInsumos = require('./routes/insumos');
const rotaInseticidas = require('./routes/inseticidas');
const rotaFuncionarios = require('./routes/funcionarios');
const rotaFornecedores = require('./routes/fornecedores');
const rotaDespesas = require('./routes/despesas');
const rotaColheitas = require('./routes/colheitas');

const rotaLogin = require('./routes/login');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-Widh, Accept, Authorization, Content-Type');

    if (res.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET, PATCH, HEAD');
        return res.status(200).send({});
    }

    next();

});

app.use('/vendas', rotaVendas);
app.use('/usuarios', rotaUsuarios);
app.use('/produtos', rotaProdutos);
app.use('/pragas', rotaPragas);
app.use('/plantacoes', rotaPlantacoes);
app.use('/insumos', rotaInsumos);
app.use('/inseticidas', rotaInseticidas);
app.use('/funcionarios', rotaFuncionarios);
app.use('/fornecedores', rotaFornecedores);
app.use('/despesas', rotaDespesas);
app.use('/colheitas', rotaColheitas);

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials:true,   
    optionsSuccessStatus: 200
}
  
app.use(cors(corsOptions));

app.use('/login', rotaLogin);

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