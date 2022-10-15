import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import { useParams } from 'react-router-dom'
import styles from './Photo.module.css'
import { BsHeart, BsHeartFill } from "react-icons/bs"

const Photo = () => {
    const [photo, setPhoto] = useState()
    const [user, setUser] = useState()
    const token = localStorage.token
    const { id } = useParams()
    const [comment, setComment] = useState()
    
    const handleClick = async (id) => {
            await api.put(`http://localhost:5000/photo/likes/${id}`, null, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(res => console.log(res.data))
            .catch(err => console.log(err))        
    }

    const handleSubmit = async () => {
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
        api.get(`http://localhost:5000/photo/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(res => {
            setPhoto(res.data)
            })
        api.get(`http://localhost:5000/user/profile`, {
            headers: {
                Authorization: ` Bearer ${JSON.parse(token)} `
            }
        }).then(res => setUser(res.data))
    },[handleClick, handleSubmit])

    return (
    <div className={styles.container}>
        {photo&& 
        <div className={styles.container2}> 
            <img className={styles.img} src={`http://localhost:5000/uploads/photos/${photo.image}`} />
            <div className={styles.container3}>
                <h2 className={styles.title}>{photo.title}</h2>
                <p className={styles.createdBy}>Criado por: <span className={styles.author}>{photo.userName}</span></p>
            </div>
            <div className={styles.containerLike}>
                {photo.likes.includes(photo.userId) ? (<BsHeartFill/>) : (<BsHeart onClick={() => handleClick(photo._id)}/>)}
                <p>{photo.likes.length} like(s)</p>
            </div>
            <div className={styles.containerComments}>
                <h2 className={styles.commentsTitle}>Comentários: ({photo.comments.length})</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input type="text" placeholder="Digite aqui seu comentário" value={comment} onChange={e => setComment(e.target.value)}/>
                    <input type="submit" value="Enviar" />
                </form>
                {photo.comments.length !== 0 &&
                    photo.comments.map(comment => 
                    <div>
                        <div className={styles.photoname}>
                            <img className={styles.imgComment} src={`http://localhost:5000/uploads/users/${comment.image}`}/>
                            <p className={styles.name}>{comment.name}</p>
                        </div>
                        <p>{comment.comment}</p>
                    </div>)
                }
            </div> 
        </div>}
    </div>
  )
}

export default Photo