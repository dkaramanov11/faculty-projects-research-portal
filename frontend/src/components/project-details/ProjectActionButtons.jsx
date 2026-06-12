function ProjectActionButtons({
                                  canSendRequest,
                                  canManageProject,
                                  isCreator,
                                  isParticipant,
                                  onOpenRequestModal,
                                  onOpenProfessorModal,
                                  onOpenStudentModal
                              }) {
    return (
        <div className="details-card">
            <h2>Project Actions</h2>

            <div className="actions">
                {canSendRequest && (
                    <button onClick={onOpenRequestModal}>
                        Send Participation Request
                    </button>
                )}

                {canManageProject && (
                    <>
                        <button onClick={onOpenProfessorModal}>
                            Add Professor
                        </button>

                        <button onClick={onOpenStudentModal}>
                            Add Student
                        </button>
                    </>
                )}
            </div>

            {isParticipant && !isCreator && (
                <p className="success-text">
                    You are already a participant in this project.
                </p>
            )}
        </div>
    )
}

export default ProjectActionButtons