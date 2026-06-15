import ProjectList from '../components/project/ProjectList'
import ProfileCard from '../components/my-profile/ProfileCard'
import ProfileTabs from '../components/my-profile/ProfileTabs'
import RequestProfessorRoleModal from '../components/my-profile/modals/RequestProfessorRoleModal'
import { useProfile } from '../hooks/useProfile'
import EditProfileModal from '../components/my-profile/modals/EditProfileModal'
import ProjectForm from '../components/project/ProjectForm'

function MyProfilePage() {
    const profile = useProfile()

    if (!profile.user) {
        return <p>You are not logged in.</p>
    }

    const selectedProjects =
        profile.activeTab === 'created'
            ? profile.createdProjects
            : profile.activeTab === 'participating'
                ? profile.participatingProjects
                : profile.pendingProjects

    return (
        <section className="details-page">
            <ProfileCard profile={profile} />

            <div className="profile-tabs-section">

                <div className="profile-add-project">
                    <button
                        type="button"
                        className="add-button"
                        onClick={() => profile.setShowProjectModal(true)}
                    >
                        + Add Project
                    </button>
                </div>

                <div className="profile-tabs-wrapper">
                    <ProfileTabs profile={profile} />
                </div>

            </div>

            <ProjectList
                projects={selectedProjects}
                users={[]}
                onEdit={() => {}}
                onDelete={() => {}}
            />

            <EditProfileModal
                isOpen={profile.showEditModal}
                onClose={() => profile.setShowEditModal(false)}
                form={profile.editForm}
                onChange={profile.handleEditChange}
                onSubmit={profile.handleProfileUpdate}
            />

            <RequestProfessorRoleModal
                isOpen={profile.showProfessorModal}
                onClose={() => profile.setShowProfessorModal(false)}
                message={profile.professorMessage}
                setMessage={profile.setProfessorMessage}
                onSubmit={profile.handleProfessorRoleRequest}
            />

            {profile.showProjectModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <ProjectForm
                            form={profile.projectForm}
                            editingId={null}
                            categories={profile.categories}
                            onChange={profile.handleProjectChange}
                            onSubmit={profile.handleCreateProject}
                            onCancel={profile.resetProjectForm}
                        />
                    </div>
                </div>
            )}

        </section>
    )
}

export default MyProfilePage