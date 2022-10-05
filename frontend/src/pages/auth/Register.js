import styles from "./Register.module.css"
import { Link } from "react-router-dom"

const Register = () => {
  return (
    <div class={styles.page}>
      <div className={styles.container}>
        <h2>ReactGram</h2>
        <p>Cadastre-se para ver as fotos do seu amigo</p>
        <form>
          <input type="text" placeholder="Digite o seu nome"/>
          <input type="email" placeholder="Digite o seu email"/>
          <input type="password" placeholder="Digite a sua senha"/>
          <input type="password" placeholder="Confirme a sua senha"/>
          <input type="submit" value="Cadastrar" />
        </form>
        <p className={styles.lastp}>Já tem conta? Faça o <Link className={styles.login} to="/login">login</Link> e aproveite.</p>
      </div>
    </div>
  )
}

export default Register