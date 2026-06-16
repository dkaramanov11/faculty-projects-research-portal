import { createContext, useContext, useEffect, useState } from 'react'
import { getMe, login, logout, register } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [unreadInboxCount, setUnreadInboxCount] = useState(0)

    useEffect(() => {
        if (token) {
            getMe(token).then(data => {
                if (data.data) {
                    setUser(data.data)
                }
            })
        }
    }, [token])

    function registerUser(formData) {
        return register(formData).then(data => {
            localStorage.setItem('token', data.token)
            setToken(data.token)
            setUser(data.user)
            return data
        })
    }

    function loginUser(formData) {
        return login(formData).then(data => {
            localStorage.setItem('token', data.token)
            setToken(data.token)
            setUser(data.user)
            return data
        })
    }

    function logoutUser() {
        return logout(token).then(() => {
            localStorage.removeItem('token')
            setToken(null)
            setUser(null)
        })
    }

    return (
        <AuthContext.Provider value={{
            user,
            token,
            unreadInboxCount,
            setUnreadInboxCount,
            registerUser,
            loginUser,
            logoutUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}