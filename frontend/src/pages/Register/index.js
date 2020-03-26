import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './styles.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');

  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      uf,
      city
    }

    try{

      const { data: { id } } = await api.post('ongs', data);

      alert(`Seu ID de acesso: ${id}`);

      history.push('/');

    }catch(e){
      alert('Erro no cadastro de ONG');
    }

  }

  return (
    <div className="register-container">
      <div className="content">
        <section>

        <img src={logoImg} alt="logo"/>

        <h1>Cadastro</h1>
        <p>Faca seu cadastro, entre na plataforma e ajude as pesssoas a encontrarem os casos da sua ONG.</p>

        <Link className="back-link" to="/">
          <FiArrowLeft size={16} color="#E02141" />
          Nao tenho cadastro
        </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input placeholder="Nome da ONG" 
          onChange={e => setName(e.target.value)} />

          <input type="email" placeholder="Email" 
          onChange={e => setEmail(e.target.value)} />

          <input placeholder="Whatsapp" 
          onChange={e => setWhatsapp(e.target.value)} />

          <div className="input-group">
            <input placeholder="Cidade" 
            onChange={e => setCity(e.target.value)} />

            <input placeholder="UF" style={{ width: 80 }} 
            onChange={e => setUf(e.target.value)} />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
