function ParticipantRow({ participant }) {
    return (
        <div className="participant-item">
            <div>
                <strong>{participant.full_name}</strong>
                <p>@{participant.username}</p>
            </div>

            <span className="role-badge">
                {participant.role}
            </span>
        </div>
    )
}

function ProjectParticipants({
                                 participants,
                                 canManageProject,
                                 onAddProfessor,
                                 onAddStudent
                             }) {
    const professors = participants.filter(p => p.role === 'professor')
    const students = participants.filter(p => p.role === 'student')

    return (
        <div className="details-card participants-card">
            <h2>Participants</h2>

            <div className="participants-columns">
                <div className="participant-group">
                    <h3>Professors</h3>

                    {professors.length === 0 ? (
                        <p className="empty-text">No professors yet.</p>
                    ) : (
                        professors.map(professor => (
                            <ParticipantRow
                                key={professor.id}
                                participant={professor}
                            />
                        ))
                    )}

                    {canManageProject && (
                        <button
                            className="secondary-button participant-add-button"
                            onClick={onAddProfessor}
                        >
                            Invite Professor
                        </button>
                    )}
                </div>

                <div className="participant-group">
                    <h3>Students</h3>

                    {students.length === 0 ? (
                        <p className="empty-text">No students yet.</p>
                    ) : (
                        students.map(student => (
                            <ParticipantRow
                                key={student.id}
                                participant={student}
                            />
                        ))
                    )}

                    {canManageProject && (
                        <button
                            className="secondary-button participant-add-button"
                            onClick={onAddStudent}
                        >
                            Invite Student
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProjectParticipants