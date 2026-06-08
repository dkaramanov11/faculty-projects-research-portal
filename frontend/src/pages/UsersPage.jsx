import { useEffect, useState } from 'react'
import { getUsers } from '../services/userService'
import { Link } from 'react-router-dom'

function UsersPage() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers().then(data => setUsers(data.data))
    }, [])

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
                    <Link to={`/users/${user.id}`} className="user-row user-row-link" key={user.id}>
                        <div>
                            <strong>{user.full_name}</strong>
                            <p>@{user.username} · {user.email}</p>
                        </div>

                        <span className={`role-badge ${user.role}`}>
                            {user.role}
                         </span>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default UsersPage