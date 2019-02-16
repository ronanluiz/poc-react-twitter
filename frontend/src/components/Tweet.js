import React, { Component } from 'react';
import api from '../services/api';

import like from '../like.svg';
import './Tweet.css';

export default class Tweet extends Component {
    handleLike = async (e) => {
        const { _id } = this.props.item;

        await api.put(`tweets/${_id}/like`);
    }

  render() {
    const { item } = this.props;

    return (
        <li className="tweet">
            <strong>{item.autor}</strong>
            <p>{item.conteudo}</p>
            <button type="button" onClick={this.handleLike}>
                <img src={like} alt="Like" />
                {item.likes}
            </button>
        </li>
    );
  }
}
