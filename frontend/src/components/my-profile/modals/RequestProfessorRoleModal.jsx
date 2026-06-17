function RequestProfessorRoleModal({
                                       isOpen,
                                       onClose,
                                       message,
                                       setMessage,
                                       onSubmit
                                   }) {
    if (!isOpen) {
        return null
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Request Professor Role</h2>

                    <button
                        type="button"
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <p>
                    Explain why you should be registered as a professor.
                </p>

                <textarea
                    placeholder="Write your message..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                />

                <div className="modal-actions">
                    <button
                        type="button"
                        className="secondary-button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button type="button" onClick={onSubmit}>
                        Send Request
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RequestProfessorRoleModal