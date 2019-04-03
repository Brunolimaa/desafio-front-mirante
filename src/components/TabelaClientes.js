import React, { Component } from 'react';
import decodeToken from '../config/config';
import SweetAlert from 'sweetalert2-react';
import Modal from 'react-modal';
import FormularioCliente from './FormularioCliente';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default class TabelaClientes extends Component {

  constructor(props) {
    super(props);

    this.state = { clientes: [], nome: '', marca: '', adminUser: false, show: false, modalIsOpen: false, idCliente: '' };
    this.excluir = this.excluir.bind(this);
    this.buscaLista = this.buscaLista.bind(this);
    this.home = this.home.bind(this);
    this.isAdmin = this.isAdmin.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  componentDidMount() {
    this.buscaLista();
  }

  buscaLista() {
    var token = decodeToken(localStorage.getItem('auth-token'));
    this.isAdmin(token.sub);

    const requestInfo = {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
      })
    };

    fetch('https://desafio-mirante-api.herokuapp.com/clientes', requestInfo)
      .then(response => response.json())
      .then(clientes => {
        this.setState({ clientes: clientes });
        console.log(this.state.clientes);
      })
  }

  isAdmin(role) {
    if (role === 'admin') {
      this.setState({ adminUser: true });
    }
  };

  excluir(event) {
    event.preventDefault();

    var token = decodeToken(localStorage.getItem('auth-token'));
    const requestInfo = {
      method: 'DELETE',
      headers: new Headers({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
      })
    };

    fetch(`https://desafio-mirante-api.herokuapp.com/clientes/${event.target.value}`, requestInfo)
      .then(response => response)
      .then(clientes => {
        this.buscaLista();
        this.setState({ show: true })
      })

    console.log(event.target.value);
  }

  home() {
    this.props.history.push('/cadastro');
  }

  openModal(event) {
    this.setState({ modalIsOpen: true, idCliente: event.target.value });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div hidden={this.props.hidden}>

        <SweetAlert
          show={this.state.show}
          title="Excluído"
          text="Excluído com sucesso."
          onConfirm={() => this.setState({ show: false })}
        />
        <button type="submit" onClick={this.home} hidden={!this.state.adminUser} className="pure-button pure-button-primary">Home</button>


        <table className="table col-12 col-md-8" >
          <thead className="thead-light">
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">CPF</th>
              <th scope="col">CEP</th>
              <th scope="col">Logradouro</th>
              <th scope="col">Bairro</th>
              <th scope="col">Cidade</th>
              <th scope="col">UF</th>
              <th scope="col">Complemento</th>
              <th scope="col">Email</th>
              <th scope="col">Telefone</th>
              <th scope="col" hidden={!this.state.adminUser}>Acao</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.clientes.map(x => {
                return (
                  <tr key={x.id}>
                    <td>{x.nome}</td>
                    <td>{x.cpf}</td>
                    <td>{x.cep}</td>
                    <td>{x.logradouro}</td>
                    <td>{x.bairro}</td>
                    <td>{x.cidade}</td>
                    <td>{x.uf}</td>
                    <td>{x.complemento}</td>
                    <td>{x.email}</td>
                    <td>{x.telefone}</td>
                    <td hidden={!this.state.adminUser}>
                      <button type="submit" className="form-control btn btn-primary mb-2" value={x.id} onClick={this.openModal}>editar</button>
                      <button type="button" className="form-control btn btn-danger mb-2" value={x.id} onClick={this.excluir}>excluir</button>

                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
          <button onClick={this.closeModal}>close</button>
          <div className="content" id="content">
            <div className="pure-form">
              <FormularioCliente value={this.state.idCliente} hidden={!this.state.adminUser} />
            </div>
          </div>

        </Modal>

      </div>
    );
  }

}
