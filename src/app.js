import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import {Server} from 'socket.io'



const PORT=3000;

const app=express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'../views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'../public')));


app.get('/chat',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).render('chat');
})

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).render('home');
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

let mensajes= [{
    emisor:'Server',
    mensaje:'Bienvenido al chat'
}]

const io= new Server(server)

io.on('connection', socket=>{
    console.log(`Se ha conectado un cliente con id ${socket.id}`)
    
    
    socket.on('id', nombre=>{        
        socket.emit('bienvenida', mensajes)
        usuarios.push({
            id: socket.id,
            nombre
    })
        socket.broadcast.emit('nuevoUsuario', nombre)

    })
    socket.on('nuevoMensaje',mensaje=>{
        mensajes.push(mensaje);
        io.emit('llegoMensaje',mensaje)

    })

let usuarios= [];

    socket.on('disconnect', function () {
            let indice= usuarios.findIndex(usuario=>usuario.id===socket.id);
            let usuario= usuarios[indice];
            io.emit('usuarioDesconectado', usuario);

            usuarios.splice(indice,1);
        
    });

})


