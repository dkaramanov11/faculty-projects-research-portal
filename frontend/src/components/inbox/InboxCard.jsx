import { Link } from 'react-router-dom'

function ProjectLink({ project }) {
    if (!project) {
        return null
    }

    return (
        <Link
            to={`/projects/${project.id}`}
            className="inbox-link-text"
        >
            {project.title}
        </Link>
    )
}

function UserLink({ user }) {
    if (!user) {
        return null
    }

    return (
        <Link
            to={`/users/${user.id}`}
            className="inbox-link-text"
        >
            {user.full_name}
        </Link>
    )
}

function getInboxDescription(item) {
    if (item.inbox_type === 'project_creation') {
        return item.status === 'approved'
            ? 'Your project was approved by the admin and is now visible in the projects list.'
            : 'Your project was not approved by the admin.'
    }

    if (item.inbox_type === 'professor_role') {
        return item.status === 'approved'
            ? 'Your request was approved by the admin.'
            : 'Your request was not approved by the admin.'
    }

    if (item.is_incoming) {
        return 'This request needs your response.'
    }

    if (item.status === 'accepted') {
        return 'Good news! The request was accepted.'
    }

    if (item.status === 'rejected') {
        return 'The request was rejected.'
    }

    return 'Waiting for response.'
}

function InboxCard({ item, onAccept, onReject, onDelete }) {
    const isIncomingPending =
        item.is_incoming && item.status === 'pending'

    return (
        <div className={`request-card ${item.status}`}>
            <div className="request-header">
                <div>
                    {item.inbox_type === 'professor_role' && (
                        <h3>
                            Your professor role request was {item.status}
                        </h3>
                    )}

                    {item.inbox_type === 'project_creation' && (
                        <h3>
                            Your project <ProjectLink project={item.project} /> was {item.status}
                        </h3>
                    )}

                    {!item.inbox_type && item.is_incoming && (
                        <h3>
                            <UserLink user={item.sender} /> wants to join{' '}
                            <ProjectLink project={item.project} />
                        </h3>
                    )}

                    {!item.inbox_type && !item.is_incoming && (
                        <h3>
                            <UserLink user={item.receiver} /> responded to your request for{' '}
                            <ProjectLink project={item.project} />
                        </h3>
                    )}

                    <p>{getInboxDescription(item)}</p>
                </div>

                <span className={`status ${item.status}`}>
                    {item.status}
                </span>
            </div>

            {item.message && (
                <p className="request-message">
                    "{item.message}"
                </p>
            )}

            {isIncomingPending && (
                <div className="request-actions">
                    <button onClick={() => onAccept(item.id)}>
                        Accept
                    </button>

                    <button
                        className="danger"
                        onClick={() => onReject(item.id)}
                    >
                        Reject
                    </button>
                </div>
            )}

            <div className="inbox-card-footer">
                <button
                    type="button"
                    className="delete-notification-link"
                    onClick={() => onDelete(item)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default InboxCard