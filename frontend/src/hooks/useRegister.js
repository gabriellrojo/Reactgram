import api from "../utils/api"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const useAuth = () => {
    const [auth, setAuth] = useState(false)
    const [error, setError] = useState()
    const navigate = useNavigate()
    const userPost = async (user) => {
        try
        {
            await api.post("http://localhost:5000/user/register", user)
            .then(res => localStorage.setItem("token", JSON.stringify(res.data.token)))
        }
        catch(err) {
            const erro = err.response.data.erro[0]
            if(erro.length !== 0) {
                setError(erro)
            }
            return
        }
        navigate("/")
    }

    useEffect(() => {
        const token = localStorage.token
        if(token){
            setAuth(true)
        }
    }, [userPost])
    

    const logout = () => {
        localStorage.removeItem("token")
        setAuth(false)
        
        
    }
    
    return { auth, userPost, logout, error } 
}

export default useAuth