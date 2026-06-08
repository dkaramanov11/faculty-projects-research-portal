import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser } from '../services/userService'

function UserDetailsPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUser(id).then(data => setUser(data.data))
    }, [id])

    if (!user) {
        return <p>Loading user...</p>
    }

    return (
        <section className="details-page">
            <button className="secondary" onClick={() => navigate('/users')}>
                Back to Users
            </button>

            <div className="details-card">
                <span className={`role-badge ${user.role}`}>
                    {user.role}
                </span>

                <h1>{user.full_name}</h1>

                <p><strong>Username:</strong> @{user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Surname:</strong> {user.surname}</p>
            </div>
        </section>
    )
}

export default UserDetailsPage