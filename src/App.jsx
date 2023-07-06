import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import EditTransactionsPage from "./pages/EditTransactionPage"
import AuthContext from "./context/AuthContext"
import { useState } from "react"

export default function App() {
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  
  return (
    <PagesContainer>
      <AuthContext.Provider value={[token, setToken]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage setAmount={setAmount} setDescription={setDescription} setId={setId}/>} />
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
          <Route path="/editar-registro/:tipo" element={<EditTransactionsPage amount={amount} description={description} id={id} setAmount={setAmount} setDescription={setDescription}/>} />
        </Routes>
      </BrowserRouter>
      </AuthContext.Provider>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
