import styles from "./Navbar.module.css"
import { Link, NavLink } from "react-router-dom"
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from "react-icons/bs"

const Navbar = () => {
  return (
    <div className={styles.navcontainer}>
        <div className={styles.frsblock}>
            <Link to="/">ReactGram</Link>
            <form className={styles.form}>
                <BsSearch/>
                <input className={styles.searchform} type="text" placeholder="pesquisar"/>
            </form>
        </div>
        <nav className={styles.nav}>
            <NavLink to="/"><BsHouseDoorFill/></NavLink>
            <NavLink to="/login"><p className={styles.entry}>Entrar</p></NavLink>
            <NavLink to="/Register"><p>Cadastrar</p></NavLink>
        </nav>
    </div>
  )
}

export default Navbar