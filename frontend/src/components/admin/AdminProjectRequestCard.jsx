import { Link } from 'react-router-dom'
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
                    <h3>
                        <Link
                            to={`/projects/${request.project.id}`}
                            className="admin-link"
                        >
                            {request.project.title}
                        </Link>
                    </h3>

                    <p>
                        Requested By:

                        <Link
                            to={`/users/${request.user.id}`}
                            className="admin-link"
                        >
                            {request.user.full_name}
                        </Link>

                        ({request.user.role})
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