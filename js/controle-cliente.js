const URL = 'http://localhost:3400/clientes';
let modoEdicao = false;

let btnAdicionar = document.getElementById ('btn-adicionar');
let tabelaCliente = document.querySelector('table>tbody');
let modalCliente = new bootstrap.Modal(document.getElementById("modal-cliente"), {});
let tituloModal = document.querySelector('h4.modal-title');

let btnSalvar = document.getElementById('btn-salvar');
let btnCancelar = document.getElementById('btn-cancelar');

let formModal = {

id: document.getElementById('id'),
nome: document.getElementById('nome'),
email: document.getElementById('email'),
telefone: document.getElementById('telefone'),
cpf: document.getElementById('cpf'),
dataCadastro: document.getElementById('dataCadastro'),

}


btnAdicionar.addEventListener('click', () =>{

modoEdicao = false;
tituloModal.textContent = "Adicionar cliente"
modalCliente.show();
});

btnSalvar.addEventListener('click', () => {
    //1º Capturar os dados do modal
    let cliente = obterClienteDoModal();
    //2° Verificar se os campos obrigatórios foram preenchidos.
    //3° Enviar o cadastro
    //4° Atualizar a tabela com o nome do cliente
    //5° Fechar o modal
modalCliente.hide();
});

btnCancelar.addEventListener('click', () => {
    modalCliente.hide();
});


function obterClienteDoModal(){

    return new Cliente({
        id: formModal.id.value,
        email: formModal.email.value,
        nome: formModal.nome.value,
        cpf: formModal.cpf.value,
        telefone: formModal.telefone.value,
        //dataCadastro: formModal.dataCadastro.value,

    });

    
}

function obterClientes() {

    fetch(URL, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(clientes => {
            popularTabela(clientes);
        })
        .catch()
}


function editarCliente(id){

    modoEdicao = true;
    tituloModal.textContent = "Editar cliente"
    modalCliente.show();
/*alert('Aqui vou editar o cliente' + id);*/

}

function excluirCliente(id){

    alert('Aqui vou excluir o cliente' + id);
    
    }

function criarLinhaNaTabela(cliente) {

    //1° criar uma linha da tabela 
    let tr = document.createElement('tr');
    //2° Criar as TDs
    let tdId = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdCPF = document.createElement('td');
    let tdEmail = document.createElement('td');
    let tdTelefone = document.createElement('td');
    let tdDataCadastro = document.createElement('td');
    let tdAcoes = document.createElement('td');
    //3º Atualizar as TDs com os valores do cliente
    tdId.textContent = cliente.id;
    tdNome.textContent = cliente.nome;
    tdCPF.textContent = cliente.cpfOuCnpj;
    tdEmail.textContent = cliente.email;
    tdTelefone.textContent = cliente.telefone;
    tdDataCadastro.textContent = cliente.dataCadastro;

    tdAcoes.innerHTML = `<button onclick="editarCliente(${cliente.id})" class="bt btn-outline-primary btn-sm mr-2">Editar</button>
    <button onclick="excluirCliente(${cliente.id})" class="bt btn-outline-primary btn-sm mr-3">Excluir</button>`;

    //4º Adicionar as TDs dentro da linha que criei 
    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdCPF);
    tr.appendChild(tdEmail);
    tr.appendChild(tdTelefone);
    tr.appendChild(tdDataCadastro);
    tr.appendChild(tdAcoes);

    //5º Adicionar a linha na tabela 
    tabelaCliente.appendChild(tr);

}

function popularTabela(clientes) {

    
    clientes.forEach(cliente => {
        criarLinhaNaTabela(cliente)
    });
}

obterClientes();