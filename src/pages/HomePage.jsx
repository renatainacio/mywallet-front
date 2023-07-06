import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import axios from "axios"

export default function HomePage() {
  const baseURL = import.meta.env.VITE_API_URL;
  const [token, setToken] = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  let config = "";

  useEffect(() => {
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
    const promise = axios.get(`${baseURL}/user`, config);
    promise.then((res) => {
      setUser(res.data);
      console.log(res.data);
    });
    promise.catch((err) => alert(err.response.data));
    const promiseTransactions = axios.get(`${baseURL}/transacoes`, config);
    promiseTransactions.then((res) => {
      setTransactions(res.data);
    });
    promiseTransactions.catch((err) => alert(err.response.data));
  }, []);
  console.log(transactions[0]);
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, <span data-test="user-name">{user.name}</span></h1>
        <BiExit data-test="logout"/>
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.length > 0 ? transactions.map(item => 
                      <ListItemContainer>
                      <div>
                        <span>{item.date}</span>
                        <strong>{item.description}</strong>
                      </div>
                      <Value color={item.type === "entrada" ? "positivo" : "negativo"}>{item.amount}</Value>
                    </ListItemContainer>
            ) : ""
          }
        </ul>
        <article>
          <strong>Saldo</strong>
          <Value color={"positivo"} data-test="total-amount">2880,00</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/entrada")} data-test="new-income">
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate("/nova-transacao/saida")} data-test="new-expense">
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`