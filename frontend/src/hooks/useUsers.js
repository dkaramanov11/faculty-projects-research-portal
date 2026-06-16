import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { deleteUser, getUsers } from '../services/userService'

export function useUsers() {
    const { token } = useAuth()

    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    function loadUsers() {
        getUsers()
            .then(data => setUsers(data.data || []))
    }

    function handleDelete(userId) {

        if (!window.confirm(
            'Are you sure you want to delete this user?'
        )) {
            return
        }

        deleteUser(userId, token)
            .then(() => loadUsers())
    }

    return {
        users,
        handleDelete
    }
}