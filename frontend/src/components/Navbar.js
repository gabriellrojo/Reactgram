import styles from "./Navbar.module.css"
import { Link, NavLink } from "react-router-dom"
import { BsSearch, BsHouseDoorFill, BsFillCameraFill, BsFillPersonFill } from "react-icons/bs"
import { useContext } from "react"
import { Context } from "../context/authContext"

const Navbar = () => {
  const { auth, logout } = useContext(Context)
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
            {auth&& <NavLink to="/"><BsFillCameraFill/></NavLink>}
            {auth&& <NavLink to="/"><BsFillPersonFill/></NavLink>}
            {!auth&& <NavLink to="/login"><p className={styles.entry}>Entrar</p></NavLink>}
            {!auth&& <NavLink to="/Register"><p>Cadastrar</p></NavLink>}
            {auth&& <NavLink to="/login" onClick={logout}><p>Sair</p></NavLink>}
        </nav>
    </div>
  )
}

export default Navbar