import React, { createContext, useState } from 'react';

import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [fazendaId, setFazendaId] = useState('')

  const client = axios.create({
    baseURL: 'http://192.168.0.2:8080/api/',
  });

  async function login(user, navigation) {
    try {
      const response = await client.post('usuarios/login', user);
      navigation.navigate('Home')
      return response.data.token
    } catch (error) {
      throw new Error('Ocorreu um erro durante o login');
    }
  }

  function setToken(token) {
    setUser(oldUser => {
      return { ...oldUser, 'token': token };
    })
  }

  function setId(id) {
    setUser(oldUser => {
      return { ...oldUser, 'id': id };
    })
  }

  // async function setFazendaAndColheitaId() {
  //   const FazendaAndColheitaId = await getFazendaAndColheitaId(user.id)
  //   setUser(oldUser => {
  //     return { ...oldUser, 'teste': FazendaAndColheitaId };
  //   })
  //   return 
  // }

  async function getFazendaAndColheitaId(id) {
    try {
      const response = await client.get(`usuarios/${id}/fazenda-colheitas`);
      return response.data
    } catch (error) {
    }
  }

  async function getColheita(id) {
    try {
      const response = await client.get(`colheitas/${id}`)
      return response.data
    } catch (error) {
      console.error('Error during getColheita:', error);
    }
  }

  async function getColheitaByFazendaId(fazendaId) {
    try {
      const response = await client.get(`colheitas/?fazendaId=${fazendaId}`)
      return response.data._embedded.entityModelList
    } catch (error) {
      console.error('Error during getColheitaByFazendaId:', error);
    }
  }

  async function createColheita(colheita, idFanzeda, navigation) {
    const newColheita = {
      ...colheita,
      colheita: {
        dataColheita: colheita.colheita.dataColheita.replace(/\//g, "-"),
        quantidade: parseInt(colheita.colheita.quantidade)
      }
    }
    try {
      await client.post(`colheitas/criarColheita/${idFanzeda}`, newColheita)
      navigation.navigate('Home')
    } catch (error) {
      console.error('Error during createColheita:', error)
    }
  }

  async function getDistribuicoesByFazendaId() {
    try {
      const response = await client.get(`distribuicao/?colheitaId=1`)
      return response.data._embedded.entityModelList
    } catch (error) {
      return error
    }
  }
  
  async function getFazendas(){
    try {
      const response = await client.get(`fazendas/fazendasProximas?localizacao=São Paulo`)
      return response.data._embedded.entityModelList
    } catch (error) {
      console.error('Error during getFazendas:', error);
    }
  }

  return (
    <UserContext.Provider value={{ user, login, setToken, setId, getFazendaAndColheitaId, getColheita, getColheitaByFazendaId, createColheita, setFazendaId, fazendaId, getDistribuicoesByFazendaId, getFazendas }}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
