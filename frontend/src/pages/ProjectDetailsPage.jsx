import ProjectInfoCard from '../components/project-details/ProjectInfoCard'
import ProjectParticipants from '../components/project-details/ProjectParticipants'

import SendRequestModal from '../components/project-details/modals/SendRequestModal'
import InviteProfessorModal from '../components/project-details/modals/InviteProfessorModal'
import InviteStudentModal from '../components/project-details/modals/InviteStudentModal'
import EditProjectModal from '../components/project-details/modals/EditProjectModal'

import { useProjectDetails } from '../hooks/useProjectDetails'

function ProjectDetailsPage() {
    const details = useProjectDetails()

    if (!details.project) {
        return <p>Loading project...</p>
    }

    return (
        <section className="details-page">
            <button
                className="back-button"
                onClick={() => details.navigate('/projects')}
            >
                        ←  Back to Projects
            </button>

            <ProjectInfoCard
                project={details.project}
                isCreator={details.isCreator}
                onEdit={details.openEditForm}
                onDelete={details.handleDelete}
            />

            <ProjectParticipants
                participants={details.project.participants || []}
                canManageProject={details.canManageProject}
                onAddProfessor={() => details.setShowProfessorModal(true)}
                onAddStudent={() => details.setShowStudentModal(true)}
            />

            {details.canSendRequest && (
                <div className="details-card participation-request-card">
                    <div>
                        <h2>Want to participate?</h2>
                        <p>Send a participation request to the project creator.</p>
                    </div>

                    <button onClick={() => details.setShowRequestModal(true)}>
                        Send Participation Request
                    </button>
                </div>
            )}

            <EditProjectModal
                isOpen={details.showEditModal}
                project={details.project}
                form={details.form}
                categories={details.categories}
                onChange={details.handleChange}
                onSubmit={details.handleUpdate}
                onClose={() => details.setShowEditModal(false)}
            />

            <SendRequestModal
                isOpen={details.showRequestModal}
                onClose={() => details.setShowRequestModal(false)}
                requestMessage={details.requestMessage}
                setRequestMessage={details.setRequestMessage}
                onSend={details.handleSendRequest}
                requestSent={details.requestSent}
            />

            <InviteProfessorModal
                isOpen={details.showProfessorModal}
                onClose={() => details.setShowProfessorModal(false)}
                professors={details.professors}
                selectedProfessorId={details.selectedProfessorId}
                setSelectedProfessorId={details.setSelectedProfessorId}
                inviteMessage={details.professorInviteMessage}
                setInviteMessage={details.setProfessorInviteMessage}
                onInvite={details.handleInviteProfessor}
            />

            <InviteStudentModal
                isOpen={details.showStudentModal}
                onClose={() => details.setShowStudentModal(false)}
                students={details.students}
                studentSearch={details.studentSearch}
                setStudentSearch={details.setStudentSearch}
                selectedStudentId={details.selectedStudentId}
                setSelectedStudentId={details.setSelectedStudentId}
                inviteMessage={details.studentInviteMessage}
                setInviteMessage={details.setStudentInviteMessage}
                onInvite={details.handleInviteStudent}
            />
        </section>
    )
}

export default ProjectDetailsPage