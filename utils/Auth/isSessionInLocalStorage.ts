const isSessionInLocalStorage = () => {
    const token = localStorage.getItem("JACKED__ACCESS_TOKEN") || {}
    return token
}

export default isSessionInLocalStorage