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
            await api.post("http://localhost:5000/user/register", user, {
                "Content-Type": "application/json"
            })
            .then(res => localStorage.setItem("token", JSON.stringify(res.data.token)))
        }
        catch(err) {
            const erro = err.response.data.erros[0]
            if(erro.length !== 0) {
                setError(erro)
            }
            return
        }
        navigate("/")
    }

    //login

    const login = async (user) => {
        try{

            await api.post("http://localhost:5000/user/login", user, {
                "Content-Type": "application/json"
            }).then(res => localStorage.setItem("token", JSON.stringify(res.data.token)))
    
        }catch(err){
            const erro = err.response.data.erros[0]
            if(erro.length !== 0){
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
    }, [userPost, login])
    
    //logout

    const logout = () => {
        localStorage.removeItem("token")
        setAuth(false)
        
        
    }
    
    return { auth, userPost, login, logout, error } 
}

export default useAuth