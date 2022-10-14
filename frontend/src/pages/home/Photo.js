import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import { useParams } from 'react-router-dom'
import styles from './Photo.module.css'
import { BsHeart, BsHeartFill } from "react-icons/bs"

const Photo = () => {
    const [photo, setPhoto] = useState()
    const token = localStorage.token
    const { id } = useParams()

    useEffect(() => {
        api.get(`http://localhost:5000/photo/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(res => {
            setPhoto(res.data)
            })
    },[])
    
    const handleClick = async (id) => {
            await api.put(`http://localhost:5000/photo/likes/${id}`, null, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(res => console.log(res))
            .catch(err => console.log(err))        
    }

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
        </div>}
    </div>
  )
}

export default Photo