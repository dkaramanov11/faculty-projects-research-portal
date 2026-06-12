function InviteStudentModal({
                                isOpen,
                                onClose,
                                students,
                                studentSearch,
                                setStudentSearch,
                                selectedStudentId,
                                setSelectedStudentId,
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
                    <h2>Add Student</h2>

                    <button
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search student by name..."
                    value={studentSearch}
                    onChange={e => setStudentSearch(e.target.value)}
                />

                {studentSearch && (
                    <div className="search-results">
                        {students.map(student => (
                            <button
                                key={student.id}
                                type="button"
                                className={`search-result ${
                                    selectedStudentId == student.id
                                        ? 'selected-result'
                                        : ''
                                }`}
                                onClick={() =>
                                    setSelectedStudentId(student.id)
                                }
                            >
                                {student.full_name} (@{student.username})
                            </button>
                        ))}
                    </div>
                )}

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
                        disabled={!selectedStudentId}
                    >
                        Send Invitation
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InviteStudentModal