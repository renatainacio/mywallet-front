import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import AuthContext from "../context/AuthContext";

export default function TransactionsPage(props) {

  const {tipo} = useParams();
  const type = tipo === "entrada" ? "entrada" : tipo === "saida" ? "saída" : "";
  const {amount, description, id, setAmount, setDescription} = props;
  const [token, setToken] = useContext(AuthContext);
  const navigate = useNavigate();
  let config;
  let localUserToken;

  useEffect(() => {
    if(!token){
      localUserToken = JSON.parse(localStorage.getItem("token"));
      if(localUserToken){
        setToken(localUserToken);
        config = {
          headers: {
            "Authorization": `Bearer ${localUserToken}`
          }
        }
      }
    }
    else {
      config = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }}
    if (!token && !localUserToken)
      return navigate('/');
  }, []);

  function submitUpdate(e){
    e.preventDefault();
    if(amount <= 0)
      return alert("O valor informado deve ser positivo.")
    if(Number.isInteger(amount))
      return alert("O valor informado deve ser de ponto flutuante.");
      if(!token){
        localUserToken = JSON.parse(localStorage.getItem("token"));
        if(localUserToken){
          setToken(localUserToken);
          config = {
            headers: {
              "Authorization": `Bearer ${localUserToken}`
            }
          }
        }
      }
      else {
        config = {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }}
    const promise = axios.put(`${import.meta.env.VITE_API_URL}/transacoes/${id}`, {
      description,
      amount
    }, config);
    promise.then(() => navigate('/home'));
    promise.catch((err) => alert(err.response.data));
  };

  return (
    <TransactionsContainer>
      <h1>Editar {type}</h1>
      <form onSubmit={submitUpdate}>
        <input placeholder="Valor" type="number" data-test="registry-amount-input" required value={amount} onChange={e => setAmount(e.target.value)}/>
        <input placeholder="Descrição" type="text" data-test="registry-name-input" required value={description} onChange={e => setDescription(e.target.value)}/>
        <button data-test="registry-save">Atualizar {type}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
