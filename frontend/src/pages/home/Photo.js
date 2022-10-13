import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import { useParams } from 'react-router-dom'
import styles from './Photo.module.css'

const Photo = () => {
    const [photo, setPhoto] = useState()
    const token = localStorage.token
    const { id } = useParams()

    useEffect(() => {
        api.get(`http://localhost:5000/photo/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(res => setPhoto(res.data))
    },[])
  
    return (
    <div className={styles.container}>
        {photo&& 
        <div className={styles.container2}> 
            <img src={`http://localhost:5000/uploads/photos/${photo.image}`} />
            <h2 className={styles.title}>{photo.title}</h2>
            <p>Criado por: {photo.userName}</p>
        </div>}
    </div>
  )
}

export default Photo