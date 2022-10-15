import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"
import api from "../../utils/api"
import styles from "./EditPhoto.module.css"

const EditPhoto = () => {
    const { id } = useParams()
    const token = localStorage.token
    const idUser = localStorage.id
    const [photo, setPhoto] = useState()
    const [title, setTitle] = useState()
    
    useEffect(() => {
        api.get(`http://localhost:5000/photo/${id}`, {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(res => setPhoto(res.data))
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const photo = {
            title: title   
        }

        await api.put(`http://localhost:5000/photo/update/${id}`, photo, {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(res => console.log(res))
    }
  
  return (
    <div className={styles.container}>
        <div className={styles.edit}>
            <h2>Edite a sua photo:</h2>
            {photo&& 
            <div>
                <img className={styles.img} src={`http://localhost:5000/uploads/photos/${photo.image}`} />
            </div>}
            {photo&&
            <div>
                <form onSubmit={handleSubmit}>
                    <input className={styles.plus} type="text" placeholder={photo.title} value={title} onChange={e => setTitle(e.target.value)}/>
                    <input className={styles.plus}  type="submit" value="Editar" />
                    <Link className={styles.cancelar} to={`/profile/${JSON.parse(idUser)}`}>Cancelar</Link>
                </form>
            </div>}
        </div>
    </div>
  )
}

export default EditPhoto