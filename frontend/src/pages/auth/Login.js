import styles from "./Login.module.css"
import { Link } from "react-router-dom" 
import { useState } from "react"
import useRegister from "../../hooks/useRegister"

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const { login, error } = useRegister()
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      email: email,
      password: password
    }

    login(user)

  }

  return (
    <div className={styles.container}>
      <div className={styles.logincontainer}>
        <h2>ReactGram</h2>
        <p>Faça o login e aproveite o ReactGram</p>
        {error&& <p className="containererror">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Digite o seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Digite a sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <input type="submit" value="Entrar"/>
        </form>
        <p>Não tem conta? <Link to="/register"><span className={styles.register}>Registre-se</span></Link></p>
      </div>
    </div>
  )
}

export default Login