import styles from "./Home.module.css"
import { Context } from "../../context/authContext"
import { useContext } from "react"

const Home = () => {
  const { token } = useContext(Context)
  return (
    <div>
      {token ? ("to aqui") : ("nao to aqui")}
      <p>{token}</p>
    </div>
  )
}

export default Home