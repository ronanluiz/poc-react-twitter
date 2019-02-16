import React, { Component } from 'react';
import api from '../services/api';
import socket from 'socket.io-client';

import twitterLogo from '../twitter.svg';
import './Timeline.css';
import Tweet from '../components/Tweet';

export default class Timeline extends Component {
  state = {
    tweets: [],
    novoTweet: ''
  };

  // método que é executado quando a tela é carregada
  async componentDidMount() {
    // escuta os eventos de alteração de dados
    this.subscribeEvents();

    const response = await api.get('tweets');

    this.setState({ tweets: response.data });
  }

  subscribeEvents = () => {
    const io = socket('http://localhost:3000');

    // utiza o recuro ... para adição no final da lista
    io.on('tweetCriado', data => {
      this.setState({ tweets: [data, ...this.state.tweets]})
    });

    io.on('likeAtualizado', data => {
      this.setState({ 
        tweets: this.state.tweets.map(tweet =>
          tweet._id === data._id ? data : tweet
        )
      });
    });
  }

  handleChangeInputNovoTweet = (e) => {
    this.setState({ novoTweet: e.target.value});
  }

  handleNovoTweet = async (e) => {
    if(e.keyCode !== 13) return;

    const conteudo = this.state.novoTweet;
    const autor = localStorage.getItem('@PocTwitter:nomeUsuario');

    await api.post('tweets', {conteudo, autor});

    this.setState({ novoTweet: ''});
  }

  render() {
    return (
        <div className="timeline-wrapper">
            <img src={twitterLogo} height={24} alt="PocTwitter" />
            <form>
                <textarea 
                  value={this.state.novoTweet}
                  onChange={this.handleChangeInputNovoTweet}
                  onKeyDown={this.handleNovoTweet}
                  placeholder="O que está acontecendo?"
                ></textarea>
            </form>

            <ul className="tweet-list">
            { 
              this.state.tweets.map(tweet => (
                <Tweet key={tweet._id} item={tweet} />
              ))
            }
            </ul>
        </div>
    );
  }
}
