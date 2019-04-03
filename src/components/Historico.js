import React, { Component } from 'react';
import decodeToken from '../config/config';
import Header from './Header';

export default class Historico extends Component {
    constructor(props) {
        super(props);

        this.state = { clientes: [], nome: '', marca: '' };
        this.home = this.home.bind(this);
    }

    componentDidMount() {
        var token = decodeToken(localStorage.getItem('auth-token'));
        // this.state.usuario = token.sub;

        // if (this.isAdmin(token.sub)) {
        //   this.setState({ adminUser: false });
        // }

        const requestInfo = {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
            })
        };

        fetch('https://desafio-mirante-api.herokuapp.com/historicos/', requestInfo)
            .then(response => response.json())
            .then(clientes => {
                this.setState({ clientes: clientes });
                console.log(this.state.clientes);
            })
    }

    home(){
        this.props.history.push('/cadastro');
    }

    render() {
        return (


            <div className="col-12">

                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#conteudoNavbarSuportado" aria-controls="conteudoNavbarSuportado" aria-expanded="false" aria-label="Alterna navegação">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="conteudoNavbarSuportado">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="pure-menu-link" hidden={this.state.adminUser} href="#" onClick={this.home} >Home </a>
                            </li>
                            <li className="nav-item">
                                <button type="submit" onClick={this.logout} className="pure-button pure-button-primary">sair</button>
                            </li>
                        </ul>
                    </div>
                </nav>
                <table className="table col-12 col-md-8" hidden={this.props.hidden}>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Usuario</th>
                            <th scope="col">Data Operacao</th>
                            <th scope="col">Tipo Operacao</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.clientes.map(x => {
                                return (
                                    <tr key={x.id}>
                                        <td>{x.nome}</td>
                                        <td>{x.dataOperacao}</td>
                                        <td>{x.tipoOperacao}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );

    }
}