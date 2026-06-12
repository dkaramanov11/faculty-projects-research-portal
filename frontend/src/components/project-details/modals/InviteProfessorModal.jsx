function InviteProfessorModal({
                                  isOpen,
                                  onClose,
                                  professors,
                                  selectedProfessorId,
                                  setSelectedProfessorId,
                                  inviteMessage,
                                  setInviteMessage,
                                  onInvite
                              }) {
    if (!isOpen) {
        return null
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add Professor</h2>

                    <button
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <select
                    value={selectedProfessorId}
                    onChange={e => setSelectedProfessorId(e.target.value)}
                >
                    <option value="">
                        Select professor
                    </option>

                    {professors.map(professor => (
                        <option
                            key={professor.id}
                            value={professor.id}
                        >
                            {professor.full_name}
                        </option>
                    ))}
                </select>

                <textarea
                    placeholder="Invitation message..."
                    value={inviteMessage}
                    onChange={e => setInviteMessage(e.target.value)}
                />

                <div className="modal-actions">
                    <button
                        className="secondary-button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onInvite}
                        disabled={!selectedProfessorId}
                    >
                        Send Invitation
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InviteProfessorModal