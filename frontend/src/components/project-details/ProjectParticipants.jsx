function ProjectParticipants({ participants }) {
    return (
        <div className="details-card">
            <h2>Participants</h2>

            {participants.length === 0 ? (
                <p>No participants yet.</p>
            ) : (
                <div className="participants-list">
                    {participants.map(participant => (
                        <div
                            key={participant.id}
                            className="participant-item"
                        >
                            <div>
                                <strong>
                                    {participant.full_name}
                                </strong>

                                <p>
                                    @{participant.username}
                                </p>
                            </div>

                            <span className="badge">
                                {participant.role}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProjectParticipants