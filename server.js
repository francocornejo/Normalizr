import express from 'express';
import router from './routes/index.js';
import { Server as IOServer} from 'socket.io'
import {engine} from 'express-handlebars'
import messages from './controllers/messages.js'
import dbMariadb from './sql/mariaDB.js';
import { normalize, schema, denormalize } from "normalizr";
import util from "util";
const app = express();
const puerto = 8080;
const messagesContainer = new messages(dbMariadb, "mensaje")
const messagesNormalizar= []

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true));
}

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: './main.hbs'
}))
app.set('view engine', 'hbs');
app.set('views', './public/views')

app.use('/api', express.static('public'))

app.use('/api', router)

const serverExpress = app.listen(puerto, () => {
    console.log('Servidor escuchando en puerto 8080')
})
const io =  new IOServer(serverExpress)



io.on('connection', async socket => {
    console.log(`Se conecto un usuario ID: ${socket.id}`)

    const authorSchema = new schema.Entity('authors', {}, {idAttribute:'email'})
    const commentSchema = new schema.Entity(
        'comments',
        {author: authorSchema},
        { idAttribute: "id" })
    
    const chatSchema = new schema.Entity(
        'chats', 
        { comments: [commentSchema]},
        { idAttribute: "id" }
    );

    let chatNormalizado = normalize({id:"chat1", comments: messagesNormalizar}, chatSchema); 
    print(chatNormalizado)
    
    io.emit('server: message', chatNormalizado)

    socket.on('cliente: clientMessage', async data =>{

        data.id=(messagesNormalizar.length)+1
        messagesNormalizar.push(data)

        //const { email, message } = data
        await messagesContainer.addMessage(data.author, data.comment)
        chatNormalizado = normalize({id:"chat1",comments: messagesNormalizar}, chatSchema); 
        print(chatNormalizado)
        io.emit('server: message', chatNormalizado)
    })
})
