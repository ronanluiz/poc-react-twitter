import React, { Component } from 'react';

import twitterLogo from '../twitter.svg';
import './Login.css';

export default class Login extends Component {
    state = {
        nomeUsuario: ''
    };
    
    handleChangeNomeUsuario = (e) => {
        // altera a propriedade do state
        this.setState({ nomeUsuario: e.target.value });
    }
    
    handleSubmit = (e) => {
        // altera o comportamento padrão de recarregar a página no submit
        e.preventDefault();

        const {nomeUsuario} = this.state;

        if(!nomeUsuario.length) return;

        // salva os dados no local storage
        localStorage.setItem('@PocTwitter:nomeUsuario', nomeUsuario);

        // redireciona para outra página
        this.props.history.push('/timeline');
    }   

    render() {
        return ( 
            <div className="login-wrapper">
                <img src={twitterLogo} alt="PocTwitter"/>
                <form onSubmit={this.handleSubmit}>
                    <input
                        value={this.state.nomeUsuario}
                        onChange={this.handleChangeNomeUsuario}
                        placeholder="Nome do usuário"></input>
                    <button type="submit">Entrar</button>
                </form>
            </div>
    )
  }
}
