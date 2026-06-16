import { useEffect, useState } from 'react'
import { getUsers, deleteUser } from '../services/userService'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function UsersPage() {
    const [users, setUsers] = useState([])

    const { user, token } = useAuth()

    if (!user || user.role !== 'admin') {
        return <Navigate to="/projects" />
    }

    useEffect(() => {
        loadUsers()
    }, [])

    function loadUsers() {
        getUsers()
            .then(data => setUsers(data.data))
    }

    function handleDelete(userId) {
        if (!window.confirm('Delete this user?')) {
            return
        }

        deleteUser(userId, token)
            .then(() => loadUsers())
    }

    return (
        <section className="users-page">

            <div className="page-header">
                <div>
                    <h1>Users</h1>
                    <p>Students and professors registered in the portal.</p>
                </div>
            </div>

            <div className="user-list">

                {users.map(user => (
                    <div
                        className="user-row"
                        key={user.id}
                    >

                        <Link
                            to={`/users/${user.id}`}
                            className="user-row-link"
                        >
                            <div className="user-info">

                                <div className="user-name-row">
                                    <strong>{user.full_name}</strong>

                                    <span className={`role-badge ${user.role}`}>
                                        {user.role}
                                    </span>
                                </div>

                                <p>
                                    @{user.username} · {user.email}
                                </p>

                            </div>
                        </Link>

                        <button
                            className="danger"
                            onClick={() => handleDelete(user.id)}
                        >
                            Remove
                        </button>

                    </div>
                ))}

            </div>

        </section>
    )
}

export default UsersPage