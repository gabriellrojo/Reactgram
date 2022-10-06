const useLogOut = () => {
    const userOut = () => {
        localStorage.removeItem("token")
    }
    return userOut
}

export default useLogOut