function AdminProfessorRequestCard({
                                       request,
                                       onApprove,
                                       onReject,
                                       onDelete
                                   }) {
    return (
        <div className={`request-card ${request.status}`}>
            <div className="request-header">
                <div>
                    <h3>{request.user.full_name}</h3>

                    <p>
                        Username: @{request.user.username}
                    </p>

                    <p>
                        Email: {request.user.email}
                    </p>
                </div>

                <span className={`status ${request.status}`}>
                    {request.status}
                </span>
            </div>

            {request.message && (
                <p className="request-message">
                    {request.message}
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

export default AdminProfessorRequestCard