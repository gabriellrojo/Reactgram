import styles from "./Register.module.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import useAuth from "../../hooks/useRegister"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const { userPost, error } = useAuth()
  

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword

    }

    userPost(user)

  }

  return (
    <div class={styles.page}>
      <div className={styles.container}>
        <h2>ReactGram</h2>
        <p>Cadastre-se para ver as fotos do seu amigo</p>
        {error && <p className="containererror">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Digite o seu nome" value={name} onChange={(e) => setName(e.target.value)}/>
          <input type="email" placeholder="Digite o seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Digite a sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <input type="password" placeholder="Confirme a sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          <input type="submit" value="Cadastrar" />
        </form>
        <p className={styles.lastp}>Já tem conta? Faça o <Link className={styles.login} to="/login">login</Link> e aproveite.</p>
      </div>
    </div>
  )
}

export default Register