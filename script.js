let nomeUsuario = '';
let usuario = '';
let chat = [];

entrarNaSala();

// entrada na sala

function entrarNaSala() {
    usuario = prompt ('Digite seu lindo nome:');
    nomeUsuario = {
        name: usuario,
    }
    enviarUsuario();    
}

function enviarUsuario() {
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nomeUsuario);
    promessa.then(tratarSucesso);
    promessa.catch(tratarErro); 
}

function tratarSucesso(res){
    console.log ('Deu certo o envio do usuário :)', res)
    setInterval(importarChat,3000);
    setInterval(manterConexao, 5000);
}

function tratarErro(err){
    console.log ('Deu ruim o envio do usuário :(', err)
    console.log(err.response.status);
    if (err.response.status === 400){
        alert ('O nome já está sendo usado. Tente outro ;)');
        entrarNaSala();
    }
}

function manterConexao() {
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomeUsuario);
    promessa.then(console.log('Conexão mantida por mais 5s'));    
    promessa.catch(deuErroConexao); 
}

function deuErroConexao(err) {
    console.log('Deu erro na manutenção da conexão', err);
    alert("Desconectado após 5s de inatividade");   
}

// chat

function importarChat() {

    let limpalistaChat = document.querySelector('.lista-chat');
    limpalistaChat = '';

    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(renderizarChat);
    promessa.catch(deuErro);

    const elementoQueQueroQueApareca = document.querySelector('.lista-chat');
    elementoQueQueroQueApareca.scrollIntoView(false);
}

function renderizarChat(res){
    console.log('Deu certo o recebimento das mensagens', res);
    //console.log(res.data);
    const chatSemFiltro = res.data; 

    function msgVisivel(chatSemFiltro){      
        if (chatSemFiltro.type === 'status' || chatSemFiltro.type === 'message' || (chatSemFiltro.type === 'private_message' && chatSemFiltro.to === usuario)){
            return true;
        }
    }
        
        const listaChat = document.querySelector('.lista-chat');

        const chat = chatSemFiltro.filter(msgVisivel);
     
        for (let i = 0; i < chat.length; i++) {

            if (chat[i].type === 'status'){
                listaChat.innerHTML += `
            <li class = "linha-chat ${chat[i].type}"> 
                <p>(${chat[i].time})</p>
                <p>${chat[i].from}</p>
                <p>${chat[i].text}</p>        
            </li>
            `;
            }
            if (chat[i].type === 'message'){
            listaChat.innerHTML += `
            <li class = "linha-chat ${chat[i].type}"> 
                <p>(${chat[i].time})</p>
                <p>${chat[i].from}</p>
                <p>para</p>
                <p>${chat[i].to}</p>
                <p>${chat[i].text}</p>        
            </li>
            `;
            } 
            if (chat[i].type === 'private_message'){
                listaChat.innerHTML += `
                <li class = "linha-chat ${chat[i].type}"> 
                    <p>(${chat[i].time})</p>
                    <p>${chat[i].from}</p>
                    <p> reservadamente para</p>
                    <p>${chat[i].to}</p>
                    <p>${chat[i].text}</p>        
                </li>
                `;
            } 
        }   
}

function deuErro(err) {
    console.log('Deu erro no recebimento das mensagens', err);
    alert("Algo deu errado. Tenta de novo ;)");   
}

// envio de mensagem

function enviarMensagem() {

    const textoMsg = document.querySelector('.mensagem');

    msgEnviada = {
        from: usuario,
        to: "Todos",
        text: textoMsg.value,
        type: "message"
    };

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', msgEnviada);
    promessa.then(importarChat);
    promessa.catch(deuErro);

    textoMsg.value = "";

}