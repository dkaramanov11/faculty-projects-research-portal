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

    async function registerUser(formData) {
        const response = await register(formData)

        if (!response.ok) {
            return response
        }

        localStorage.setItem('token', response.data.token)
        setToken(response.data.token)
        setUser(response.data.user)

        return response
    }

    async function loginUser(formData) {
        const response = await login(formData)

        if (!response.ok) {
            return response
        }

        localStorage.setItem('token', response.data.token)
        setToken(response.data.token)
        setUser(response.data.user)

        return response
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