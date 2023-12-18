
// Capturando as variaveis necessarias

// classe required no html
const campos = document.querySelectorAll('.required');
// Classe do botão olho
const olho = document.getElementById('btn-senha');
// Estilo span-required no css
const spans  = document.querySelectorAll('.span-required');
//Regex do email
const emailRegex =/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
//Pegando id name 
let nome = document.querySelector('#name')
let validNome = false
//Pegando id email 
let email = document.querySelector('#email')
let validEmail = false
//Pegando id senha  
let senha = document.querySelector('#password')
let validSenha = false

//função para mostrar a senha 
function mostrarSenha(){
    var inputPass = document.getElementById('password')
    var btnShowPass = document.getElementById('btn-senha')

    if(inputPass.type === 'password'){
        inputPass.setAttribute('type', 'text')
        btnShowPass.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')
    }else{
        inputPass.setAttribute('type', 'password')
        btnShowPass.classList.replace('bi-eye-slash-fill', 'bi-eye-fill')
    }
}

//Criando a função do estilo do erro
function setError(index) {
    campos[index].style.border = '2px solid red';
    spans[index].style.display = 'block';
    olho.style.bottom = '28%';
}

//Retirando a função do estilo do erro
function removeError(index) {
    campos[index].style.border = '2px solid green';
    spans[index].style.display = 'none';
}

//validando nome
nome.addEventListener('keyup', ()=> {
    if(nome.value.length <= 2 ){
        setError(0);
        validNome = false
    }else{
        removeError(0);
        validNome = true
    }
})

//Validando email
email.addEventListener('keyup', ()=> {
    if(!emailRegex.test(campos[1].value)){
        setError(1);
        validEmail = false
    }
    else{
        removeError(1);
        validEmail = true
    }
}) 

//Validando senha
senha.addEventListener('keyup', ()=> {
    if(senha.value.length <= 7 ){
        setError(2);
        validSenha = false
    }else{
        removeError(2);
        validSenha = true
    }
})

//Função alerta de sucesso
function alertSucesso(){
    Swal.fire({
        icon: "success",
        title: "Sucesso",
        text: "Usuário Cadastro!",
    });
}
//Função alerta de erro
function alertErro(){
    Swal.fire({
        icon: "error",
        title: "ERRO",
        text: "Preencha todos os campos corretamente!",
    });
}

//Criando os validadores dos inputs 
function cadastrar(event) {
    event.preventDefault();  // Evita o comportamento padrão de envio do formulário

    if (validNome && validEmail && validSenha) {
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
        
        listaUser.push({
            nomeCad: nome.value,
            emailCad: email.value,
            senhaCad: senha.value
        });

        localStorage.setItem('listaUser', JSON.stringify(listaUser));
        
        alertSucesso();

        setTimeout (() => {
            window.location.href = "../tela-login/index.html";
        }, 3000);
        
    } else {
        alertErro();
    }
}

// Adicione um ouvinte de evento para o envio do formulário
const formulario = document.getElementById('form');  
formulario.addEventListener('submit', cadastrar);
