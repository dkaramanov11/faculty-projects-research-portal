function ProfileCard({ profile }) {
    return (
        <div className="profile-card details-card">
            <div className="profile-avatar">
                {profile.user.name.charAt(0)}
                {profile.user.surname.charAt(0)}
            </div>

            <span className={`role-badge ${profile.user.role}`}>
                {profile.user.role}
            </span>

            <div className="profile-info">
                <div className="profile-info-row">
                    <strong>Username:</strong>
                    <span>@{profile.user.username}</span>
                </div>

                <div className="profile-info-row">
                    <strong>Email:</strong>
                    <span>{profile.user.email}</span>
                </div>

                <div className="profile-info-row">
                    <strong>Name:</strong>
                    <span>{profile.user.name}</span>
                </div>

                <div className="profile-info-row">
                    <strong>Surname:</strong>
                    <span>{profile.user.surname}</span>
                </div>
            </div>

            <div className="profile-card-footer">

                {profile.user.role === 'student' && !profile.requestSent && (
                    <span
                        className="request-professor-link"
                        onClick={() => profile.setShowProfessorModal(true)}
                    >
                        Request professor role
                     </span>
                )}

                <button
                    type="button"
                    className="secondary-button"
                    onClick={profile.openEditModal}
                >
                    Edit Profile
                </button>

            </div>
        </div>
    )
}

export default ProfileCard