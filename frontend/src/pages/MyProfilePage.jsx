import { useAuth } from '../context/AuthContext'

function MyProfilePage() {
    const { user } = useAuth()

    if (!user) {
        return <p>You are not logged in.</p>
    }

    return (
        <section className="details-page">
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

export default MyProfilePage