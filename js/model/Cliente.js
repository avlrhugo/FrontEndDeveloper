//Classe que representa o nosso cliente

class cliente {
    constructor (obj){
        obj = obj || {};
        this.id = obj.id;
        this.nome = obj.nome;
        this.cpf = obj.cpf;
        this.email = obj.email;
        this.telefone = obj.telefone;
        this.datacadastro = obj.datacadastro;
    }


}