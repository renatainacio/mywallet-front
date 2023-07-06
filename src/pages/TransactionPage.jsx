import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"

export default function TransactionsPage() {

  const {tipo} = useParams();
  const type = tipo === "entrada" ? "entrada" : tipo === "saida" ? "saída" : "";
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [token, setToken] = useContext(AuthContext);
  const navigate = useNavigate();

  function registerTransaction(){
    if(amount <= 0)
      return alert("O valor informado deve ser positivo.")
    if(Number.isInteger(amount))
      return alert("O valor informado deve ser de ponto flutuante.");
    if(!token){
      const localUserToken = JSON.parse(localStorage.getItem("token"));
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
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/nova-transacao/${tipo}`, {
      description,
      amount
    }, config);
    promise.then(() => navigate('/home'));
    promise.catch((err) => alert(err.response.data));
  };

  return (
    <TransactionsContainer>
      <h1>Nova {type}</h1>
      <form onSubmit={registerTransaction}>
        <input placeholder="Valor" type="number" data-test="registry-amount-input" required value={amount} onChange={e => setAmount(e.target.value)}/>
        <input placeholder="Descrição" type="text" data-test="registry-name-input" required value={description} onChange={e => setDescription(e.target.description)}/>
        <button data-test="registry-save">Salvar {type}</button>
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
