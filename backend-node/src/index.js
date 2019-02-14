const express = require('express');
const database = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
// habilita o protocolo WS (Web Socket) na aplicação
const io = require('socket.io')(server);

database.connect(
    'mongodb://estudo-user:estudouser123@cluster0-shard-00-00-vsk8a.mongodb.net:27017,cluster0-shard-00-01-vsk8a.mongodb.net:27017,cluster0-shard-00-02-vsk8a.mongodb.net:27017/goweek-backend?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', 
    {
        useNewUrlParser: true
    }
);

// middleware que intercepta as requisições e configura o socket.io
app.use((req, res, next) =>{
    req.io = io;

    // libera a aplicação para o próximo passo da requisição
    return next();
});

// habilita o cors da aplicação
app.use(cors());
// configura o express para utilização de json
app.use(express.json());
// configura o arquivo de rotas
app.use(require('./routes'));

server.listen(3000, () => {
    console.log('Server was started on port 3000');
});