
//Criando os validadores dos inputs 
const form = document.getElementById('form');
const olho = document.getElementById('btn-senha')
const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');
const erro = document.getElementById('erro');
const emailRegex =/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

//Criando a função do estilo do erro
function setError(index) {
    campos[index].style.border = '2px solid red';
    spans[index].style.display = 'block';
    olho.style.bottom = '40%';
}

//Retirando a função do estilo do erro
function removeError(index) {
    campos[index].style.border = '';
    spans[index].style.display = 'none';
}

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

//Validando o email
function emailValidate(){
    if(!emailRegex.test(campos[0].value)){
        setError(0);
    }
    else{
        removeError(0);
    }
}

//Validando a senha
function passwordValidate(){
        if(campos[1].value.length < 8){
            setError(1);
        }else{
            removeError(1);
        }
}

function alertErro(){
    Swal.fire({
        icon: "error",
        title: "ERRO",
        text: "Preencha todos os campos corretamente!",
    });
}

//função para verificar se a conta existe
function entrar (event){
    event.preventDefault();  // Evita o comportamento padrão de envio do formulário
    //Pegando o id dos inputs
    let email = document.getElementById('email')
    let senha = document.getElementById('password')

    let listaUser = []

    let userValid = {
        nome: '',
        email: '',
        senha: ''
    }
    listaUser = JSON.parse(localStorage.getItem('listaUser'))

    listaUser.forEach((item) => {
        if(email.value == item.emailCad && senha.value == item.senhaCad){

            userValid = {
                nome: item.nomeCad,
                email: item.emailCad,
                senha: item.senhaCad
            }
        }
    });
    //Validando se os inputs estão certos
    if(email.value == false && senha.value == false) {
        alertErro()
        campos[0].style.border = '2px solid red';
        campos[1].style.border = '2px solid red';
    }

     else if(email.value == userValid.email && senha.value == userValid.senha){
        campos[0].style.border = '2px solid green';
        campos[1].style.border = '2px solid green';
        olho.style.bottom = '39%';
        erro.style.display = 'none'; 

        setTimeout (() => {
           window.location.href = "../tela-inicio/index_inicio.html";
        }, 2000);

        let token = Math.random().toString(16).substring(2)
        localStorage.setItem('token', token)

        localStorage.setItem('nomeLogado', JSON.stringify(userValid))
    } else {
        campos[0].style.border = '2px solid red';
        campos[1].style.border = '2px solid red';
        olho.style.bottom = '45%';
        erro.style.display = 'block';
    }
}