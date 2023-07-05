import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useState } from "react"

export default function SignUpPage() {

  const registerURL = `${import.meta.env.VITE_API_URL}/cadastro`
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  function register(e){
    e.preventDefault();
    if(password != passwordConfirmation){
      alert("A confirmação de senha não bate com o campo senha!")
      return ;
    }
    const promise = axios.post(registerURL, {
      username,
      email,
      password
    });
    promise.catch((error) => {
      alert(error.response.data);
    });
    promise.then(() => {
      navigate("/");
    });
  }


  return (
    <SingUpContainer>
      <form onSubmit={register}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" value={username} onChange={e => setUsername(e.target.value)} required data-test="name"/>
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required data-test="email"/>
        <input placeholder="Senha" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} required data-test="password"/>
        <input placeholder="Confirme a senha" type="password" autoComplete="new-password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required data-test="conf-password"/>
        <button type="submit" data-test="sign-up-submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
