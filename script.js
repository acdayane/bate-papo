let nomeUsuario = '';
let chat = [];
let linhaChat = '';

entrarNaSala();

function entrarNaSala() {
    nomeUsuario = prompt ('Digite seu lindo nome:');

    enviarUsuario();
    setInterval(importarChat,3000);
}



function importarChat () {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(renderizarChat);
    promessa.catch(deuErro);

    const elementoQueQueroQueApareca = document.querySelector('.lista-chat');
    elementoQueQueroQueApareca.scrollIntoView(false);
}

function renderizarChat(res){
    console.log('deu certo');
    //console.log(res.data);
    const chatSemFiltro = res.data; 

    function msgVisivel(chatSemFiltro){      
        if (chatSemFiltro.type === 'status' || chatSemFiltro.type === 'message' || (chatSemFiltro.type === 'private_message' && chatSemFiltro.to === nomeUsuario)){
            return true;
        }
    }
        
        const listaChat = document.querySelector('.lista-chat');

        const chat = chatSemFiltro.filter(msgVisivel);
        console.log(chat);

        for (let i = 0; i < chat.length; i++) {
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
}


function deuErro(err) {
    console.log('deu erro');
    alert("Algo deu errado. Tenta de novo ;)");
}

/*
entrarNaSala();



function entrarNaSala() {
    const novousuario = prompt ('Digite seu lindo nome:');
    participantes = {
        name: novousuario,
    }

    console.log(participantes);
    enviarDados();

}



function pegarDados (){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promessa.then(dadosChegaram);
    promessa.catch(deuErro);
}

function dadosChegaram(res){
    console.log("Resposta completa do get", res);
    console.log("Resposta.data do get", res.data);
} 

function enviarDados (){

    // enviar novousuario para o servidor
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', participantes);
    promessa.then(deuCerto);
    promessa.catch(deuErro);
    
 
    // renderizar novousuario no html
   // renderizarUsuarios();
}

function deuCerto(res){ // pegar dados

    console.log('Deu certo!');
    console.log(res);
    const promessa = axios.get ('https://mock-api.driven.com.br/api/v6/uol/participants');
    promessa.then(dadosChegaram);

    renderizarUsuarios();
}

function deuErro(err){
    console.log('Deu erro :(');
    console.log(err.response.status);
    if (err.response.status === 400){
        alert ('O nome já está sendo usado. Tente outro ;)');
        entrarNaSala();
    }
}


function renderizarUsuarios(){
    const chat = document.querySelector('.ul');
    chat.innerHTML = "";

    for (let i=0; i<listaParticipantes.lenght; i++){
        innerHTML += `
        <li> ${participantes = {
            name: novousuario,
        }}
        <li>
        `
    }

}


function carregarMensagens {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');

    promessa.then (quandoSucesso);
    console.log('Deu certo')
    promessa.then (quandoErro);
    console.log ('Deu ruim')
}

function manterConexao() {

}

function buscarMensagens() {

}

function enviarMensagem() {
    const mensagem = document.querySelector('.mensagem'); */