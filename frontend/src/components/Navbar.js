import styles from "./Navbar.module.css"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { BsSearch, BsHouseDoorFill, BsFillCameraFill, BsFillPersonFill } from "react-icons/bs"
import { useContext, useState } from "react"
import { Context } from "../context/authContext"

const Navbar = () => {
  const [query, setQuery] = useState()
  const { auth, logout } = useContext(Context)
  const navigate = useNavigate()
  const id = localStorage.id

  const handleSubmit = (e) => {
    e.preventDefault()

    if(query){
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.navcontainer}>
        <div className={styles.frsblock}>
            <Link className={styles.logo} to="/">ReactGram</Link>
            <form onSubmit={handleSubmit} className={styles.form}>
                <BsSearch/>
                <input className={styles.searchform} type="text" placeholder="pesquisar" value={query} onChange={e => setQuery(e.target.value)}/>
            </form>
        </div>
        <nav className={styles.nav}>
            <NavLink to="/"><BsHouseDoorFill/></NavLink>
            {auth&& <NavLink to={`/profile/${JSON.parse(id)}`}><BsFillCameraFill/></NavLink>}
            {auth&& <NavLink to="/profile/edit"><BsFillPersonFill/></NavLink>}
            {!auth&& <NavLink to="/login"><p className={styles.entry}>Entrar</p></NavLink>}
            {!auth&& <NavLink to="/Register"><p>Cadastrar</p></NavLink>}
            {auth&& <NavLink to="/login" onClick={logout}><p>Sair</p></NavLink>}
        </nav>
    </div>
  )
}

export default Navbar