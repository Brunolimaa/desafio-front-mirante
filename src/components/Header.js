import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom';

export default class Header extends Component {

    constructor(props) {
        super(props);
        
    }




    render() {
        return (


            <ul className="pure-menu-list">
                <li hidden={this.props.hidden} className="pure-menu-item"> <a className="pure-menu-link" href="#" onClick={this.props.onClick}>Lista </a></li>
            </ul>


        );
    }

}