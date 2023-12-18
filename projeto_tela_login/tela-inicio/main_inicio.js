//Função alerta de erro
function alertErro(){ 
    Swal.fire({
        icon: "error",
        title: "ERRO",
        text: "Você precisa estar logado para acessar essa página!",
    });
}

// Validando se o token existe
if(localStorage.getItem('token') == null || localStorage.getItem('nomeLogado') == null){
    alertErro() //Alerta de erro
    setTimeout (() => {
        window.location.href = "../tela-login/index.html"; //Redirecionando para tela de login
    }, 5000);
} 
else {
    let nomeLogado = JSON.parse(localStorage.getItem('nomeLogado')) //Pegando o nome no localStorage
    let logado = document.getElementById('logado') //Pegando o id do h1
    logado.innerHTML = 'Escolha um novo <br>estilo de vida ' + nomeLogado.nome.split(' ')[0] + '!' //Mensagem com o nome
}

// função para sair do pagina
function sair(){
    localStorage.removeItem('token') //Limpando o token
    localStorage.removeItem('nomeLogado') //Limpando o nome
    window.location.href = "../tela-login/index.html"; //Redirecionando para tela de login
}

let menuItens = document.getElementById("MenuItems");

menuItens.style.maxHeight = "0px";

function menuCelular(){
    if(menuItens.style.maxHeight == "0px"){
        menuItens.style.maxHeight = "200px";
    }
    else{
        menuItens.style.maxHeight = "0px";
    }
}