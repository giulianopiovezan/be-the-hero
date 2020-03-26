import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const { data } = await api.get('profile', {
          headers: {
            Authorization: ongId
          }
        });
      setIncidents(data);
    })();
  }, [ongId]);

  async function handleDeleteIncident(id){
    try{
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })
      setIncidents(incidents.filter(inc => inc.id !== id));
    }catch(e){
      alert('Erro ao deletar caso');
    }
  }

  function handleLogout(){
    localStorage.clear();
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero"/>
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
      {
        incidents.map(inc => (
          <li key={inc.id}>
            <strong>CASO:</strong>
            <p>{inc.title}</p>

            <strong>DESCRICAO:</strong>
            <p>{inc.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', 
            { style: 'currency', currency: 'BRL' }).format(inc.value)}</p>

            <button type="button" onClick={() => handleDeleteIncident(inc.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))
      }
        
      </ul>
    </div>
  );
}
