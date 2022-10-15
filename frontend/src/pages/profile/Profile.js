import styles from "./Profile.module.css"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs"
import api from "../../utils/api"

const Profile = () => {
  const { id } = useParams ()
  const token = JSON.parse(localStorage.token)
  const [data, setData] = useState()
  const [title, setTitle] = useState()
  const [image, setImage] = useState()
  const [error, setError] = useState()
  const [photos, setPhotos] = useState()
  const [rend, setRend] = useState(false)

  const handleFile = (e) => {
    const photo = e.target.files[0]
    setImage(photo)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newPhoto = {
      title: title,
      image: image
    }

    const formData = new FormData()

    const keys = Object.keys(newPhoto)
    const newPhotoFormData = keys.forEach(key => formData.append(key, newPhoto[key]))
    formData.append("photo", newPhotoFormData)

    await api.post("http://localhost:5000/photo/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res)})
      .catch(err => setError(err.response.data.erro[0]))

  }

  const deletePhoto = async (id) => {
    await api.delete(`http://localhost:5000/photo/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => console.log(res))
  }

  useEffect(() => {
    api.get("http://localhost:5000/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setData(res.data)
      })
      .catch(err => console.log(err))

    api.get(`http://localhost:5000/photo/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    }).then(res => {
      console.log(res.data)
      setPhotos(res.data)
      })
      .catch(err => console.log(err))
  },[deletePhoto, handleSubmit])

  return (
    <div className={styles.container}>
        {data && 
        <div className={styles.infocontainer}>
          <div className={styles.imgcontainer}>
            <img className={styles.image} src={`http://localhost:5000/uploads/users/${data.image}`} />
          </div>
          <div clasName={styles.text}>
            <h2 className={styles.name}>{data.name}</h2>
            <p>{data.bio}</p>
          </div>
        </div>
        }
        {data &&
          <div className={styles.form}>
            {id === data._id &&
              <div>
                <h2 className={styles.titleform}>Compartilhe algum momento seu:</h2>
                <form onSubmit={handleSubmit}>
                  <label>
                    <span>Título para a foto</span>
                    <input type="text" placeholder="Insira o título da postagem" value={title} onChange={e => setTitle(e.target.value)}/>
                  </label>
                  <label>
                    <span>Imagem:</span>
                    <input type="file" onChange={handleFile}/>
                  </label>
                  <input type="submit" value="Postar"/>
                </form>
              </div>
            }
            {error&& <p className="containererror">{error}</p>}
          </div>
        }
        <div className={styles.photocontainer}>
          <h2 className={styles.photostitle}>Fotos publicadas:</h2>
          <div className={styles.photocontainer2}>
          {photos &&
          photos.map(photo =>
            <div className={styles.container3}>
              <img className={styles.imgsprofile} src={`http://localhost:5000/uploads/photos/${photo.image}`} alt={photo.title}/>
              {data && 
                id == data._id ? (<div className={styles.icons}>
                <Link to={`/photo/${photo._id}`}>
                  <BsFillEyeFill/>
                </Link>
                <Link to={`/photo/edit/${photo._id}`}>
                  <BsPencilFill/>
                </Link>
                <BsXLg onClick={() => deletePhoto(photo._id)}/>
                </div>) 
                : (<div className={styles.icons}>
                  <Link to={`/photo/${photo._id}`}>
                    <BsFillEyeFill/>
                  </Link>
                </div>)}
            </div>
            )}
          </div>
          {photos&& photos.length == 0&& 
            <p className={styles.nophoto}>Você ainda não publicou nenhuma foto.</p>}
        </div>
    </div>
  )
}
export default Profile