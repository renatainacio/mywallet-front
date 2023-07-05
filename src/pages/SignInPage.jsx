import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function SignInPage() {

  const loginURL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const localUserToken = JSON.parse(localStorage.getItem("token"));
    if(localUserToken){
      setToken(localUserToken);
      navigate("/home");
    }
  });

  function login(e){
    e.preventDefault();
    const promise = axios.post(loginURL, {
      email,
      password
    });
    promise.catch((error) => {
      alert(error.response.data);
    });
    promise.then((res) => {
      console.log(res.data);
      setToken(res.data);
      localStorage.setItem("token", JSON.stringify(res.data));
      navigate("/home");
    });
  }

  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required data-test="email"/>
        <input placeholder="Senha" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} required data-test="password"/>
        <button data-test="sign-in-submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
