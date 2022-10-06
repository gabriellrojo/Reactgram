import api from "../utils/api"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const useRegister = () => {
    const [token, setToken] = useState()
    const navigate = useNavigate()
    const userPost = (user) => {
        api.post("http://localhost:5000/user/register", user)
        .then(res => localStorage.setItem("token", JSON.stringify(res.data.token)))
        .catch(err => console.log(err.response.data.erros))
        navigate("/")
        
    }

    useEffect(() => {
        setToken(localStorage.token)
    },[userPost])
    
    return { userPost, token } 
}

export default useRegister