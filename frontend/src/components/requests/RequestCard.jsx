function RequestCard({
                         request,
                         onAccept,
                         onReject
                     }) {
    return (
        <div className={`request-card ${request.status}`}>
            <div className="request-header">
                <div>
                    <h3>{request.project.title}</h3>

                    <p>
                        From: {request.sender.full_name}
                    </p>
                </div>

                <span className="badge">
                    {request.type.replace('_', ' ')}
                </span>
            </div>

            {request.message && (
                <p className="request-message">
                    {request.message}
                </p>
            )}

            {request.status === 'pending' && (
                <div className="request-actions">
                    <button onClick={() => onAccept(request.id)}>
                        Accept
                    </button>

                    <button
                        className="danger"
                        onClick={() => onReject(request.id)}
                    >
                        Reject
                    </button>
                </div>
            )}
        </div>
    )
}

export default RequestCard