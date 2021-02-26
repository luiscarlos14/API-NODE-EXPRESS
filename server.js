//Exportação
const http = require('http');
const app = require('./app');

//Porta de processos
const port = process.env.PORT || 3000;

//criando um server
const server = http.createServer(app);

//O listen faz o servidor escutar as requisições vindas da porta
server.listen(port);