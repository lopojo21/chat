const socket= io();

let nombre=''
let divMensajes=document.getElementById('mensajes')
let inputMenajes=document.getElementById('mensaje')

inputMenajes.addEventListener('keyup',evt=>{
    // console.log(evt)

    if(evt.key==='Enter'){
        if(evt.target.value.trim()!=='')
        {socket.emit('nuevoMensaje',{emisor:nombre,mensaje:evt.target.value.trim()})}
        evt.target.value='';
        inputMenajes.focus()
    
    }
})

Swal.fire({
    title:"Identifiquese",
    input:"text",
    text:"Ingrese su nickname",
    inputValidator: (value)=>{
        return !value && "Debe ingresar un nombre...!!!"
    },
    allowOutsideClick:false
}).then(result=>{
    nombre= result.value

    document.title=nombre
    inputMenajes.focus()

    socket.emit('id', nombre)

    socket.on('bienvenida',mensajes=>{
        let txt=''

        mensajes.forEach(mensaje => {
            txt+=`<p class="mensaje"><strong>${mensaje.emisor}</strong><i>${mensaje.mensaje}</i></p><br>`
        });

        divMensajes.innerHTML=txt;
        divMensajes.scrollTop=divMensajes.scrollHeight;
    })
    socket.on('nuevoUsuario',nombre=>{
        Swal.fire({
            text:`${nombre} se ha conectado...!!!`,
            toast:true,
            position:"top-right"
        })
    })
    socket.on('llegoMensaje',mensaje=>{
        let txt=''

        txt+=`<p class="mensaje" ><strong>${mensaje.emisor}</strong>: <i>${mensaje.mensaje}</i></p><br>`
        divMensajes.innerHTML+=txt;
        divMensajes.scrollTop=divMensajes.scrollHeight;
    })
    socket.on('usuarioDesconectado', usuario=>{
        Swal.fire({
            text:`${usuario.nombre} se ha desconectado...!!!`,
            toast:true,
            position:"top-right"
        })
    })
})



























// const socket= io();

// let nombre= prompt('ingrese su nombre')

// socket.on('bienvenida', data=>{
//     console.log(data.message);
//     socket.emit('identificacion',nombre)
// })

// socket.on('idCorrecto',data=>{
//     console.log(data.message)
// })

// socket.on('nuevoUsuario',nombre=>{
//     console.log(`${nombre} se a unido a server`)
// })
// socket.on('nuevaTemperatura', (temperatura, fecha)=>{
//     console.log(`${fecha}: tamperatura asciende a ${temperatura}°`)
//     let pTemperatura=document.getElementById('temperatura')
//     pTemperatura.innerHTML=`la temperatura es de ${temperatura}°` 

// })

// socket.on('nuevoPersonaje',(personaje, personajes)=>{
    
//     console.log(`se dio de alta a ${personaje.name}`)
    
//     let ul=''
//             personajes.forEach(personaje=>{
//                 ul+=`<li>${personaje.name}</li>`
//             })
//             let ulDemon=document.getElementById('demon')
//             ulDemon.innerHTML=ul
// })

// const cargaPersonajes=()=>{
//     fetch('/demon')
//         .then(data=>{
//             return data.json()
//         })
//         .then(personajes=>{
//             let ul=''
//             personajes.forEach(personaje=>{
//                 ul+=`<li>${personaje.name}</li>`
//             })
//             let ulDemon=document.getElementById('demon')
//             ulDemon.innerHTML=ul

//         })
// }


// cargaPersonajes()