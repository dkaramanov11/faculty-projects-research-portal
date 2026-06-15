import { useProfile } from '../hooks/useProfile'
import RequestProfessorRoleModal from "../components/my-profile/modals/RequestProfessorRoleModal.jsx";


function MyProfilePage() {
    const profile = useProfile()

    if (!profile.user) {
        return <p>You are not logged in.</p>
    }

    return (
        <section className="details-page">
            <div className="details-card">
                <span className={`role-badge ${profile.user.role}`}>
                    {profile.user.role}
                </span>

                <h1>{profile.user.full_name}</h1>

                <p><strong>Username:</strong> @{profile.user.username}</p>
                <p><strong>Email:</strong> {profile.user.email}</p>
                <p><strong>Name:</strong> {profile.user.name}</p>
                <p><strong>Surname:</strong> {profile.user.surname}</p>

                {profile.user.role === 'student' && !profile.requestSent && (
                    <button
                        type="button"
                        onClick={() => profile.setShowProfessorModal(true)}
                    >
                        Request Professor Role
                    </button>
                )}

                {profile.requestSent && (
                    <p className="success-text">
                        Professor role request sent successfully.
                    </p>
                )}
            </div>

            <RequestProfessorRoleModal
                isOpen={profile.showProfessorModal}
                onClose={() => profile.setShowProfessorModal(false)}
                message={profile.professorMessage}
                setMessage={profile.setProfessorMessage}
                onSubmit={profile.handleProfessorRoleRequest}
            />
        </section>
    )
}

export default MyProfilePage