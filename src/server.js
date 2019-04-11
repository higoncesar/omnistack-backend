const express   = require('express');
const mongoose  = require('mongoose');
const path      = require('path');
const cors      = require('cors');

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on("connection", socket=>{
    socket.on('connectRoom',box=>{
        socket.join(box);
    })
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-7grts.mongodb.net/omnistack?retryWrites=true',
    {
        useNewUrlParser: true,
    }
);

app.use((req, res, next)=>{
    req.io = io;
    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/files',express.static(path.resolve(__dirname,'..','tmp')));

app.use(require('./routes'));

app.listen(process.env.PORT || 3333,()=>{
    console.log('Rodando Servidor na porta 3333, para finalizar tecle CTRL + C');
});