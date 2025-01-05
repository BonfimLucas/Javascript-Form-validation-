class ValidaFormulario{
    constructor(){

        this.formulario = document.querySelector('.form');
        this.eventos();

    }

    eventos(){
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const camposSaoValidos = this.camposSaoValidos();
        const senhasValidas = this.senhasSaoValidas();

        if(senhasValidas && camposSaoValidos){
            alert('Login criado');
            this.formulario.submit();
        }
    }

    senhasSaoValidas(){
        let valid = true;

        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetirsenha')

        if(senha.value !== repetirSenha.value){
            valid = false;
            this.criaErro(senha, 'Campos senha e repetir senha precisam ser iguais.')
            this.criaErro(repetirSenha, 'Campos senha e repetir senha precisam ser iguais.')
        }

        if(senha.value.length > 12 || senha.value.length < 6){
            this.criaErro(campo, `Senha precisa possuir entre 6 e 12 caracteres`);
            valid = false;
        }

        return valid;

    }

    camposSaoValidos(){
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')){
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.text-input')){

            const placeholderText = campo.getAttribute("placeholder")

            if(!campo.value){
                this.criaErro(campo, `Campo ${placeholderText} nao pode estar em branco.`);
                valid = false;
            }

            if(campo.classList.contains('cpf')){
                if(!this.validaCPF(campo)) valid = false
            }

            if(campo.classList.contains('usuario')){
                if(campo.value.length > 12 || campo.value.length < 3){
                    this.criaErro(campo, `Nome de usuario precisa possuir entre 3 e 12 caracteres`);
                    valid = false
                }
                
                
                if(!campo.value.match(/^[a-zA-Z0-9]+$/g)){
                    this.criaErro(campo, 'Usuario precisa ter somente letras ou numeros');
                    valid = false;
                }
                
            }
        


        }

        return valid;
    }

    validaCPF(campo){
        const cpf = new ValidaCPF(campo.value);

        if(!cpf.valida()){
            this.criaErro(campo, 'CPF invalido.');
            return false;
        }

        return true;
    }


    criaErro(campo, msg){
        const p = document.createElement('p');
        p.innerHTML = msg;
        p.classList.add('error-text');
        campo.insertAdjacentElement('afterend', p);
    }
}

const valida = new ValidaFormulario();