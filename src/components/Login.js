import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

export default class Login extends Component {

    constructor(props){
        super();
        this.state = {msg: ''};
    }

    envia(event){
        event.preventDefault();

        const requestInfo = {
            method: 'POST',
            body:JSON.stringify({login:this.login.value, senha: this.senha.value}),
            headers: new Headers({
                'Content-type':'application/json'
            })
        };

        fetch('https://desafio-mirante-api.herokuapp.com/login', requestInfo)
            .then(response => {
                if(response.ok){
                    const userToken = response.headers.get('Authorization').substring(7);
                    return userToken;
                } else {
                    throw new Error('não foi possível fazer o login');
                }
            })
            .then(token => {
                console.log(token);
                localStorage.setItem('auth-token', token)
                this.props.history.push('/cadastro');
            })
            .catch(error => {
                this.setState({msg:error.message});
            })
    }

    render(){ 
        return (
            <div className="login-box">
            <h1 className="header-logo">Desafio Mirante</h1>
            <span>{this.state.msg}</span>
                <form onSubmit={this.envia.bind(this)}> 
                    <input type="text" ref={(input) => this.login = input} />
                    <input type="password" ref={(input) => this.senha = input}/>
                    <input type="submit" value="login"/>
                </form>
            </div>
        );
    } 
}