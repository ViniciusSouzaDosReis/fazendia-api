import React, { createContext, useState } from 'react';

import axios from 'axios';

const ColheitaContext = createContext();
const ColheitaProvider = ({ children }) => {
  const [colheita, setColheita] = useState({})
  const [distribuicao, setDistribuicao] = useState({})

  const client = axios.create({
    baseURL: 'http://192.168.0.2:8080/api/',
  });

  async function getColheitaByID(id, navigation) {
    try {
      const response = await client.get(`colheitas/${id}`);
      setColheita(response.data)
      navigation.navigate('Colheita')
      return response.data
    } catch (error) {
      console.error('Error during getColheitaByID:', error);
    }
  }

  async function createDistribuicaoByIDColheita(distribuicaoData, navigation) {
    const newDistribuicao = {
      ...distribuicaoData,
      "quantidade": parseInt(distribuicaoData.quantidade),
      "dataEntrega": distribuicaoData.dataEntrega.replace(/\//g, "-")
    }
    try {
      const response = await client.post(`colheitas/${colheita.id}/distribuicoes`, newDistribuicao);
      setDistribuicao(response.data)
      navigation.navigate('Home')
      return response.data
    } catch (error) {
      console.error('Error during createDistribuicaoByIDColheita:', error);
    }
  }

  return (
    <ColheitaContext.Provider value={{ getColheitaByID, colheita, createDistribuicaoByIDColheita, distribuicao }}>{children}</ColheitaContext.Provider>
  );
};

export { ColheitaContext, ColheitaProvider };