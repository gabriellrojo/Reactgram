import styles from "./Home.module.css"
import { Context } from "../../context/authContext"
import { useContext } from "react"

const Home = () => {
  const { auth } = useContext(Context)
  return (
    <div>
      {auth ? ("to aqui") : ("nao to aqui")}
      <p>{auth}</p>
    </div>
  )
}

export default Home