const socket = io()
const formMessage = document.querySelector('#formMessage')
const emailInput = document.querySelector('#emailInput')
const messageInput = document.querySelector('#messageInput')
const contenedorMensaje = document.querySelector('#messagesPool')
const nombreInput = document.querySelector('#nombre') 
const apellidoInput = document.querySelector('#apellido')
const edadInput = document.querySelector('#edad')
const aliasInput = document.querySelector('#alias')
const avatarInput = document.querySelector('#avatar')
//productos
const contenedorProd = document.querySelector('#tablaProd')


function sendMessage() {
    try{
        const nombre = nombreInput.value
        const apellido = apellidoInput.value
        const edad = edadInput.value 
        const alias = aliasInput.value 
        const avatar = avatarInput.value
        const email = emailInput.value
        const message = messageInput.value
        
        console.log(email)
    
        socket.emit('cliente: clientMessage', {author: {nombre, apellido, edad, alias, avatar, email}, comment: {message} })
    } catch(err){
        console.log(`Ha ocurrido un error ${err}`)
    }
}

function MensajesRender(messageArr) {
    
    const dia = new Date()
    const year = dia.getDate()+ "/"+ dia.getMonth() + "/" +dia.getFullYear() + "-" + dia.getHours() + ":" + dia.getMinutes() + ":" + dia.getSeconds(); 
    try{
        console.log(messageArr)
        const hbs = messageArr.map(text =>{
            
            return(`<div>
                        <span>${text.author.email} ${year}</span>
                        <em>${text.comment.message}</em>
                    </div>`)
        }).join(" ");

        contenedorMensaje.innerHTML = hbs
    }catch(err){
        console.log(`Ha ocurrido un error ${err}`)
    }
}

formMessage.addEventListener('submit', event =>{
    event.preventDefault()
    sendMessage()
    
    messageInput.value = ""
})


socket.on('server: message', MensajesRender)