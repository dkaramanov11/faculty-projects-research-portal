function SendRequestModal({
                              isOpen,
                              onClose,
                              requestMessage,
                              setRequestMessage,
                              onSend,
                              requestSent
                          }) {
    if (!isOpen) {
        return null
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Send Participation Request</h2>

                    <button
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <textarea
                    placeholder="Write a short message..."
                    value={requestMessage}
                    onChange={e => setRequestMessage(e.target.value)}
                />

                <div className="modal-actions">
                    <button
                        className="secondary-button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    {requestSent ? (
                        <p className="success-text">
                            Request sent successfully.
                        </p>
                    ) : (
                        <button onClick={onSend}>
                            Send Request
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SendRequestModal