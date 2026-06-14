function AdminProjectRequestCard({
                                     request,
                                     onApprove,
                                     onReject,
                                     onDelete
                                 }) {
    return (
        <div className={`request-card ${request.status}`}>
            <div className="request-header">
                <div>
                    <h3>{request.project.title}</h3>

                    <p>
                        Created by: {request.user.full_name} ({request.user.role})
                    </p>

                    <p>
                        Type: {request.project.type}
                    </p>
                </div>

                <span className={`status ${request.status}`}>
                    {request.status}
                </span>
            </div>

            {request.project.description && (
                <p className="request-message">
                    {request.project.description}
                </p>
            )}

            <div className="request-actions">
                {request.status === 'pending' && (
                    <>
                        <button onClick={() => onApprove(request.id)}>
                            Approve
                        </button>

                        <button
                            className="danger"
                            onClick={() => onReject(request.id)}
                        >
                            Reject
                        </button>
                    </>
                )}

                <button
                    className="secondary-button"
                    onClick={() => onDelete(request.id)}
                >
                    Delete Request
                </button>
            </div>
        </div>
    )
}

export default AdminProjectRequestCard