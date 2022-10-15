import { useEffect, useState } from "react"
import api from "../../utils/api"
import styles from "./EditProfile.module.css"
import { Navigate, useNavigate } from "react-router-dom"


const EditProfile = () => {
    const token = localStorage.token
    const [userData, setUserData] = useState({})
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [image, setImage] = useState()
    const [bio, setBio] = useState()
    const [previewImage, setPreviewImage] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        api.get("http://localhost:5000/user/profile", {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(res => {
            setUserData(res.data)
            setName(res.data.name)
            setImage(res.data.image)
            setBio(res.data.bio)
            setEmail(res.data.email)
        })
        
    },[])

    const handleFile = (e) => {
        const newImage = e.target.files[0]
        setPreviewImage(newImage)
        setImage(newImage)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(name){
            userData.name = name
        }

        if(password){
            userData.password = password
        }

        if(bio){
            userData.bio = bio
        }

        if(image){
            userData.image = image
        }

        const formData = new FormData();

        const keys = Object.keys(userData)

        const userFormData = keys.forEach((key) =>
        formData.append(key, userData[key])
        );
        
        formData.append("user", userFormData)
        
        await api.put("http://localhost:5000/user/update", formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                "Content-Type": "multipart/form-data"
            }
        }).then(res => console.log(res))
          .catch(err => setError(err.response.data.erro[0]))

        navigate("/profile")

    }
  
    return (
    <div className={styles.container}>
        <div className={styles.logincontainer}>
            <h2>Edite os seus dados</h2>
            <p>Adicione uma imagem de perfil e conta mais sobre você...</p>
            {(previewImage || image) && <img className={styles.image} src={previewImage ? (URL.createObjectURL(previewImage)) : (`http://localhost:5000/uploads/users/${image}`)} alt={name} />}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder={name} value={name} onChange={e => setName(e.target.value)}/>
                <input type="email" placeholder={email} disabled value={email}/>
                <input type="password" placeholder="Password" value={password} onChange={(e => e.target.value)}/>
                <label>
                    <span className={styles.title}>Imagem do perfil:</span>
                    <input type="file" onChange={handleFile}/>
                </label>
                <label>
                    <span className={styles.title2}>Bio:</span>
                    <input type="text" placeholder={bio ? bio : "Digite a bio do seu perfil"} value={bio} onChange={e => setBio(e.target.value)}/>
                </label>
                <input type="submit" value="Atualizar"/>
            </form>
        </div>
        {error&& <p className="containererror">{error}</p>}
    </div>
  )
}

export default EditProfile