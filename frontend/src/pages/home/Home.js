import styles from "./Home.module.css"
import { useEffect, useState } from "react"
import { BsHeartFill, BsHeart } from "react-icons/bs"
import api from "../../utils/api"
import { Link } from "react-router-dom"

const Home = () => {
  const [photos, setPhotos] = useState()
  const id = localStorage.id
  const token = localStorage.token

  const handleClick = async (id) => {
    await api.put(`http://localhost:5000/photo/likes/${id}`, null, {
    headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
    }
    })        
  }

  useEffect(() => {
    api.get(`http://localhost:5000/photo`
    ).then(res => {
      setPhotos(res.data)
      })

  },[handleClick])
  
  return (
    <div className={styles.container}>
      {photos&& photos.map(photo => (
      <div className={styles.container2}>
          <img className={styles.img} src={`http://localhost:5000/uploads/photos/${photo.image}`}/>
          <div className={styles.container3}>
            <h3 className={styles.title}>{photo.title}</h3>
            <p className={styles.author}>Puplicada por <span className={styles.authorname}>{photo.userName}</span></p>
            <p className={styles.likes}>{photo.likes.includes(JSON.parse(id)) ? (< BsHeartFill/>) : (< BsHeart onClick={() => handleClick(photo._id)}/>)} {photo.likes.length} likes(s)</p>
          </div>
          <Link className="btn" to={`/photo/${photo._id}`}>Ver Mais</Link>
      </div>
      ))}
    </div>
  )
}

export default Home