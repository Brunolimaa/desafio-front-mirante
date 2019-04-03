import React from 'react';


import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Login from './components/Login';
import CadastroCliente from './components/CadastroCliente';
import App from './App';
import TabelaClientes from './components/TabelaClientes';
import Historico from './components/Historico';

function verificaUsuarioLogado(nextState, replace){
    if(localStorage.getItem('auth-token') != null){
        return true;
    }
}

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/cadastro" component={CadastroCliente} render={()=> ( 
                verificaUsuarioLogado() ? (<App />) : (<Redirect to="/?msg=Voce precisa estar logado" />)) }/>
            <Route  exact path="/lista" component={TabelaClientes} />
            <Route exact path="/historico" component={Historico} />
        </Switch>
    </BrowserRouter>
);

export default Routes;