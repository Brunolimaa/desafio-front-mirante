import React, { Component } from 'react';
import InputDefault from './InputDefault';
import jwtDecode from 'jwt-decode';
import decodeToken from '../config/config';
import MaskedFormControl from 'react-bootstrap-maskedinput'
import SweetAlert from 'sweetalert2-react';

export default class FormularioCliente extends Component {

  constructor(props) {
    super(props);
    this.state =
      {
        msg: '',
        usuario: { id: decodeToken(localStorage.getItem('auth-token')).jti },
        nome: '', cpf: '',
        endereco: { cep: '', logradouro: '', bairro: '', cidade: '', uf: '', complemento: '', show: false },
        contato: { email: '', telefone: '' },
        fone: [{ telefone: '' }],
        celular: false
      };


    this.setNome = this.setNome.bind(this);
    this.setCPF = this.setCPF.bind(this);
    this.setCEP = this.setCEP.bind(this);
    this.setLogradouro = this.setLogradouro.bind(this);
    this.setBairro = this.setBairro.bind(this);

    this.setCidade = this.setCidade.bind(this);
    this.setBairro = this.setBairro.bind(this);
    this.setCidade = this.setCidade.bind(this);
    this.setUF = this.setUF.bind(this);
    this.setComplemento = this.setComplemento.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setTelefone = this.setTelefone.bind(this);
    this.addTelefone = this.addTelefone.bind(this);
    this.habilitaTelefone = this.habilitaTelefone.bind(this);

  }

  componentDidMount() {
    if (this.props.value !== undefined) {
      console.log('AQUI'+this.props.value);

      const requestInfo = {
        method: 'GET',
        headers: new Headers({
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
        })
      };

      fetch(`https://desafio-mirante-api.herokuapp.com/clientes/${this.props.value}`, requestInfo)
        .then(response => response.json())
        .then(clientes => {
          this.nome.value = clientes.nome;

  
          this.logradouro.value = clientes.logradouro;
          this.complemento.value = clientes.complemento;
          this.bairro.value = clientes.bairro;
          this.cidade.value = clientes.cidade;
          this.uf.value = clientes.uf;
          this.logradouro.value = clientes.logradouro;
          this.email.value = clientes.email;


          this.setState({ cep: clientes.cep, cpf: clientes.cpf });
          console.log(this.state.clientes);
        })
    
  }
  console.log(decodeToken(localStorage.getItem('auth-token')));
document.getElementById("telefone").disabled = true;

  }


enviaForm(event) {
  event.preventDefault();

  var tipoMethodHttp = 'POST';
  var url = `https://desafio-mirante-api.herokuapp.com/clientes`;

  this.state.nome = this.nome.value;
  this.state.cpf = this.cpf.value;
  this.state.endereco.cep = this.cep.value;
  this.state.endereco.logradouro = this.logradouro.value;
  this.state.endereco.bairro = this.bairro.value;
  this.state.endereco.cidade = this.cidade.value;
  this.state.endereco.uf = this.uf.value;
  this.state.contato.telefone = this.telefone.value;
  this.state.contato.email = this.email.value != '' ? this.email.value : '' ;

  if(this.props.value !== undefined){
    tipoMethodHttp = 'PUT'
    url = `https://desafio-mirante-api.herokuapp.com/clientes/${this.props.value}`;
  } 


  const requestInfo = {
    method: tipoMethodHttp,
    body: JSON.stringify(this.state),
    headers: new Headers({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
    })
  };

  fetch(url, requestInfo)
    .then(response => {
      if (response.ok) {
        this.setState({ show: true })
        return response.json();
      } else {
        throw new Error('não foi possível realizar cadastro');
      }
    })
    .then(response => {

      this.logradouro.value = '';
      this.complemento.value = '';
      this.bairro.value = '';
      this.cidade.value = '';
      this.uf.value = '';
      this.logradouro.value = '';
    })
    .catch(error => {
      this.setState({ msg: error.message });
    })
}

setNome(event) {
  this.setState({ nome: event.target.value })
}

setCPF(event) {
  var cpf = '';
  cpf = event.target.value.replace(".", "");
  cpf = cpf.replace(".", "");
  cpf = cpf.replace(".", "");
  cpf = cpf.replace("-", "");
  this.cpf.value = cpf;
  this.setState({ cpf: event.target.value })
}

setCEP(event) {
  let cep = event.target.value.replace("-", "");
  this.cep.value = cep;
  if (cep.length == 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Cep Invalido');
        }
      })
      .then(response => {
        let state = this.state;

        this.logradouro.value = response.logradouro;
        this.complemento.value = response.complemento;
        this.bairro.value = response.bairro;
        this.cidade.value = response.localidade;
        this.uf.value = response.uf;
        this.logradouro.value = response.logradouro;

      })
      .catch(error => {


        this.setState({ msg: error.message });
      })
  }
  this.setState({ endereco: { cep: event.target.value } })

}

setLogradouro(event) {
  this.setState({ endereco: { logradouro: event.target.value } })
}

setBairro(event) {
  this.setState({ endereco: { bairro: event.target.value } })
}

setCidade(event) {
  this.setState({ endereco: { cidade: event.target.value } })
}

setUF(event) {
  this.setState({ endereco: { uf: event.target.value } })
}

setComplemento(event) {
  this.setState({ endereco: { complemento: event.target.value } })
}

setEmail(event) {
  this.setState({ contato: { email: event.target.value } })
}

setTelefone(event) {
  this.setState({ contato: { telefone: event.target.value } })
  let telefone = event.target.value.replace("\(", "");
  telefone = event.target.value.replace("\)", "");
  telefone = event.target.value.replace("-", "");
  this.telefone.value = telefone;
}

addTelefone(event) {
  event.preventDefault();

  this.state.fone.push({ 'telefone': this.telefone.value });
  console.log(this.state.fone);
  this.setState(this.state.fone);
}

habilitaTelefone(event) {
  document.getElementById("telefone").disabled = false;
  if (event.target.value == 'option1') {
    this.setState({ celular: true });
  }
  console.log(event.target.value);
}

render() {
  return (

    <form onSubmit={this.enviaForm.bind(this)} method="post" hidden={this.props.hidden}>
      <SweetAlert
        show={this.state.show}
        title="Cadastrado"
        text="Cadastro com sucesso."
        onConfirm={() => this.setState({ show: false })}
      />
      <div className="form-row">
        <div className="form-group col-md-6">
          <label for="staticEmail2" className="sr-only">Nome</label>
          <input type="text" required readonly className="form-control-plaintext" placeholder="Nome" ref={(input) => this.nome = input} />
        </div>
        <div className="form-group col-md-6">
          <label for="staticEmail2" className="sr-only">CPF</label>
          <input type="hidden" required ref={(input) => this.cpf = input} />
          <MaskedFormControl type='text' readonly className="form-control-plaintext" onChange={this.setCPF} name="CPF" mask='111.111.111-11' />

        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-2">
          <label for="staticEmail2" className="sr-only">CEP</label>
          <input type="hidden" ref={(input) => this.cep = input} />
          <MaskedFormControl type='text' required readonly className="form-control-plaintext" onChange={this.setCEP} name="cep" mask='11111-111' />

        </div>
        <div className="form-group col-md-4">
          <label for="staticEmail2" className="sr-only">Logradouro</label>
          <input type="text" readonly required className="form-control-plaintext" placeholder="Logradouro" ref={(input) => this.logradouro = input} />
        </div>
        <div className="form-group col-md-6">
          <label for="staticEmail2" className="sr-only">Bairro</label>
          <input type="text" readonly required className="form-control-plaintext" placeholder="Bairro" ref={(input) => this.bairro = input} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label for="staticEmail2" className="sr-only">Cidade</label>
          <input type="text" readonly required className="form-control-plaintext" placeholder="Cidade" ref={(input) => this.cidade = input} />
        </div>
        <div className="form-group col-md-2">
          <label for="staticEmail2" className="sr-only">UF</label>
          <input type="text" readonly required className="form-control-plaintext" placeholder="UF" ref={(input) => this.uf = input} />
        </div>
      </div>
      <div className="form-group mb-2">
        <label for="staticEmail2" className="sr-only">Complemento</label>
        <input type="text" readonly className="form-control-plaintext" placeholder="Complemento" ref={(input) => this.complemento = input} />
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label for="staticEmail2" className="sr-only">Email</label>
          <input type="text" readonly required className="form-control-plaintext" placeholder="Email" ref={(input) => this.email = input} />
        </div>
        <fieldset className="form-group col-md-6">
          <div className="form-row">
            <div className="form-group col-md-6">
              <input type="hidden" id="telefone" className="form-control-plaintext" placeholder="Telefone" ref={(input) => this.telefone = input} />
              <MaskedFormControl type='text' hidden={!this.state.celular} required readonly className="form-control-plaintext" onChange={this.setTelefone} name="cep" mask='11 11111-1111' />
              <MaskedFormControl type='text' hidden={this.state.celular} required readonly className="form-control-plaintext" onChange={this.setTelefone} name="cep" mask='11 1111-1111' />

            </div>
            <div className="form-group col-md-6">
              <button type="submit" onClick={this.addTelefone} className="form-control btn btn-success mb-2">+</button>
            </div>
            <div class="form-check form-check-inline col-md-3"></div>
            <div class="form-check form-check-inline col-md-3">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" value="1" onClick={this.habilitaTelefone} id="inlineRadio1" value="option1" />
              <label class="form-check-label" for="inlineRadio1">Celular</label>
            </div>
            <div class="form-check form-check-inline col-md-3">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" value="2" onClick={this.habilitaTelefone} id="inlineRadio2" value="option2" />
              <label class="form-check-label" for="inlineRadio2">Residencial</label>
            </div>
          </div>
          <div>
            <ul>
              {
                this.state.fone.map(x => {
                  if (x.telefone != '') {
                    return (
                      <li>{x.telefone}</li>
                    );
                  }
                })
              }


            </ul>
          </div>

        </fieldset>
      </div>


      <div className="form-row">
        <button type="submit" className="form-control btn btn-primary mb-2">Salvar</button>
      </div>
    </form>
  );
}
}