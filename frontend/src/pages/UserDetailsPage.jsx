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
        <div className="userDetails-page">
            
            <button
                className="back-button"
                onClick={() => navigate('/users')}
            >
                ←  Back to Users
            </button>

            <div className="profile-card details-card">

                <div className="profile-avatar">
                    {user.name.charAt(0)}
                    {user.surname.charAt(0)}
                </div>

                <span className={`role-badge ${user.role}`}>
                {user.role}
            </span>

                <div className="profile-info">
                    <div className="profile-info-row">
                        <strong>Username:</strong>
                        <span>@{user.username}</span>
                    </div>

                    <div className="profile-info-row">
                        <strong>Email:</strong>
                        <span>{user.email}</span>
                    </div>

                    <div className="profile-info-row">
                        <strong>Name:</strong>
                        <span>{user.name}</span>
                    </div>

                    <div className="profile-info-row">
                        <strong>Surname:</strong>
                        <span>{user.surname}</span>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default UserDetailsPage