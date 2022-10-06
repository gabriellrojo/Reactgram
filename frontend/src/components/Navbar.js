import styles from "./Navbar.module.css"
import { Link, NavLink } from "react-router-dom"
import { BsSearch, BsHouseDoorFill } from "react-icons/bs"
import useLogOut from "../hooks/useLogOut"
import { useContext } from "react"
import { Context } from "../context/authContext"

const Navbar = () => {
  const userOut = useLogOut()
  const { token } = useContext(Context)
  return (
    <div className={styles.navcontainer}>
        <div className={styles.frsblock}>
            <Link className={styles.logo} to="/">ReactGram</Link>
            <form className={styles.form}>
                <BsSearch/>
                <input className={styles.searchform} type="text" placeholder="pesquisar"/>
            </form>
        </div>
        <nav className={styles.nav}>
            <NavLink to="/"><BsHouseDoorFill/></NavLink>
            <NavLink to="/login"><p className={styles.entry}>Entrar</p></NavLink>
            <NavLink to="/Register"><p>Cadastrar</p></NavLink>
            {token && <NavLink to="/login" onClick={userOut}><p>Sair</p></NavLink>}
        </nav>
    </div>
  )
}

export default Navbar