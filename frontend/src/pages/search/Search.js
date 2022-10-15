import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import api from "../../utils/api"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import styles from "./Search.module.css"

const Search = () => {
  const id = localStorage.id
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const s = query.get("q")
  const token = localStorage.token
  const [photo, setPhoto] = useState()
  const [comment, setComment] = useState()

  const handleClick = async (id) => {
    await api.put(`http://localhost:5000/photo/likes/${id}`, null, {
    headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
    }
    })        
  }
  const handleSubmit = async (id) => {
    const photoComment = {
        comment: comment
    }

    await api.put(`http://localhost:5000/photo/comments/${id}`, photoComment, {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
        }
    })  .then(res => console.log(res))
        .catch(err => console.log(err))
  }

  useEffect(() => {
    api.get(`http://localhost:5000/photo/search?q=${s}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      }
    }).then(res => {
      setPhoto(res.data)
      console.log(res.data)})
      .catch(err => console.log(err))

  },[handleClick, handleSubmit])

  return (
    <div className={styles.container}>
        {photo&& photo.length == 0&& <h2>Não foram encontradas postagens para a sua busca.</h2>}
        {photo&& photo.map(photo => (
          <div>
            <div className={styles.container2}>
              <img className={styles.img} src={`http://localhost:5000/uploads/photos/${photo.image}`}/>
              <div className={styles.container3}>
                <h2 className={styles.title}>{photo.title}</h2>
                <p className={styles.createdBy}>Publicado por: <span className={styles.author}>{photo.userName}</span></p>
              </div>
              <div className={styles.containerLike}>
                <p>{photo.likes.includes(JSON.parse(id)) ? (< BsHeart />) : (< BsHeartFill onClick={() => handleClick(photo._id)}/>)}{photo.likes.length} like(s)</p>
              </div>
            </div>
            <div className={styles.containerComments}>
              <h2 className={styles.commentsTitle}>Comentários: ({photo.comments.length})</h2>
              <form className={styles.form} onSubmit={() => handleSubmit(photo._id)}>
                  <input type="text" placeholder="Digite aqui seu comentário" value={comment} onChange={e => setComment(e.target.value)}/>
                  <input type="submit" value="Enviar" />
              </form>
              {photo.comments.length !== 0 &&
                  photo.comments.map(comment => 
              <div>
                <div>
                  <div className={styles.photoname}>
                    <img className={styles.imgComment} src={`http://localhost:5000/uploads/users/${comment.image}`}/>
                    <p className={styles.name}>{comment.name}</p>
                  </div>
                </div>
                  <p className={styles.lastcomment}>{comment.comment}</p>
              </div>)}
            </div>
          </div>
        ))}
    </div>
  )
}

export default Search