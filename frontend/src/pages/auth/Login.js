import styles from "./Login.module.css"
import { Link } from "react-router-dom" 

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logincontainer}>
        <h2>ReactGram</h2>
        <p>Faça o login e aproveite o ReactGram</p>
        <form>
          <input type="email" placeholder="Digite o seu email"/>
          <input type="password" placeholder="Digite a sua senha"/>
          <input type="submit" value="Entrar"/>
        </form>
        <p>Não tem conta? <Link to="/register"><span className={styles.register}>Registre-se</span></Link></p>
      </div>
    </div>
  )
}

export default Login