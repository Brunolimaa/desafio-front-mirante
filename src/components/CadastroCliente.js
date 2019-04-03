import React, { Component } from 'react';
import FormularioCliente from './FormularioCliente';
import TabelaClientes from './TabelaClientes';
import Header from './Header';

import decodeToken from '../config/config';
import { BrowserRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom';

export default class CadastroCliente extends Component {

    constructor(props) {
        super(props);
        this.state = { clientes: [], nome: '', cpf: '', role: null, adminUser: false, usuario: '' };
        this.logout = this.logout.bind(this);
        this.lista = this.lista.bind(this);
        this.historico = this.historico.bind(this);
        this.isAdmin = this.isAdmin.bind(this);

    }

    componentDidMount() {
        var token = decodeToken(localStorage.getItem('auth-token'));
        this.state.usuario = token.sub;

        this.isAdmin(token.sub);


        const requestInfo = {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
            })
        };

        fetch('http://localhost:3002/clientes', requestInfo)
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

    logout() {
        localStorage.removeItem('auth-token');
        this.props.history.push('/');
    }

    lista() {
        this.props.history.push('/lista');
    }

    historico() {
        this.props.history.push('/historico');
    }
    //

    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="pure-menu-heading" href="#"><strong>Usuario:</strong> {this.state.usuario}</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#conteudoNavbarSuportado" aria-controls="conteudoNavbarSuportado" aria-expanded="false" aria-label="Alterna navegação">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="conteudoNavbarSuportado">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Header hidden={!this.state.adminUser} onClick={this.lista} />
                            </li>
                            <li className="nav-item">
                                <a className="pure-menu-link" hidden={!this.state.adminUser} href="#" onClick={this.historico} >Historico </a>
                            </li>
                            <li className="nav-item">
                                <button type="submit" onClick={this.logout} className="pure-button pure-button-primary">sair</button>
                            </li>
                        </ul>
                    </div>
                </nav>




                <div id="main">
                    <div className="header">
                        <h1>Clientes</h1>
                        <h2>Desafio</h2>
                    </div>
                    <div className="content" id="content">
                        <div className="pure-form">

                            <FormularioCliente hidden={!this.state.adminUser} />
                            <TabelaClientes hidden={this.state.adminUser} />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}