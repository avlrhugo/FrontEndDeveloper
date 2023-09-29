//Capturando os campos da tela 
let email = document.getElementById('e-mail')
let senha = document.getElementById('senha')
let botaodeentrar = document.getElementById('botão-de-entrar')


//Aqui capturo o evento de click para tomar uma ação qualquer 
botaodeentrar.addEventListener('click', ()=> {

//1° Pegar o e-mail digitado
let userEmail = email.value;
//2° Pegar a senha digitada
let userSenha = senha.value;
//3° Validar se o e-mail e senha estão corretos 
if (!userEmail || !userSenha){
    //4° Caso esteja incorreto, mandar mensagem de usuário ou senha inválidos
    alert ("Preencha todos os dados!");
return;
}

//Aqui precisamos enviar esse email e senha ao backend para saber se o usuário pode acessar o sistema.
autenticar (userEmail, userSenha);
//5° Caso esteja correto direcionar para página de cadastro de usuários




//window.open('cadastro-usuario.html', '_self')

});


function autenticar (email, senha){

    const urlBase = `http://localhost:3400`;

    fetch(`${urlBase}/login`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({email, senha})
    })
    
    .then(response => response = response.json())
    
    .then (response => {
        if(!!response.mensagem){
            alert(response.mensagem);
            return;

        } else{
            alert("Usuário autenticado com sucesso!");
            salvarToken(response.token);
            salvarUsuario(response.usuario);

            window.open('Cliente.html', '_self')
        }
    });
    
}

function salvarToken(token){
localStorage.setItem('token' , token)
}

function salvarUsuario(usuario){
    localStorage.setItem('usuario' , JSON.stringify(usuario));
}