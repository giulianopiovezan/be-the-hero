import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e){
    e.preventDefault();

    try{
      const { data } = await api.post('/sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', data.name);
      history.push('/profile');
    }catch(e){
      if(e.response.status === 400){
        alert('Esta ONG nao esta cadastrada.')
        return;
      }

      alert('Ocorreu um erro ao efetuar o logon.')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="logo"/>

        <form onSubmit={handleLogin}>
          <h1>Faca seu logon</h1>

          <input placeholder="Sua ID" onChange={e => setId(e.target.value)} />
          <button type="submit" className="button">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02141" />
            Nao tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}