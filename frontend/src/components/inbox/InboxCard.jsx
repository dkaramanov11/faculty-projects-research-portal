function getInboxTitle(item) {


    if (item.inbox_type === 'professor_role') {

        if (item.status === 'approved') {
            return 'Your professor role request was approved'
        }

        if (item.status === 'rejected') {
            return 'Your professor role request was rejected'
        }
    }

    const projectTitle = item.project.title

    if (item.inbox_type === 'project_creation') {
        if (item.status === 'approved') {
            return `Your project "${item.project.title}" was approved`
        }

        if (item.status === 'rejected') {
            return `Your project "${item.project.title}" was rejected`
        }
    }

    if (item.is_incoming) {

        if (item.type === 'invitation_request') {
            return `${item.sender.full_name} invited you to join ${projectTitle}`
        }

        return `${item.sender.full_name} wants to join ${projectTitle}`
    }

    if (item.type === 'invitation_request') {

        if (item.status === 'accepted') {
            return `${item.receiver.full_name} accepted your invitation for ${projectTitle}`
        }

        if (item.status === 'rejected') {
            return `${item.receiver.full_name} rejected your invitation for ${projectTitle}`
        }

        return `Waiting for ${item.receiver.full_name} to respond to your invitation`
    }

    if (item.status === 'accepted') {
        return `${item.receiver.full_name} accepted your request to join ${projectTitle}`
    }

    if (item.status === 'rejected') {
        return `${item.receiver.full_name} rejected your request to join ${projectTitle}`
    }

    return `Waiting for ${item.receiver.full_name} to respond to your request`
}

function getInboxDescription(item) {

    if (item.inbox_type === 'project_creation') {
        if (item.status === 'approved') {
            return 'Your project was approved by the admin and is now visible in the projects list.'
        }

        if (item.status === 'rejected') {
            return 'Your project was not approved by the admin.'
        }
    }

    if (item.inbox_type === 'professor_role') {

        if (item.status === 'approved') {
            return 'Your request was approved by the admin.'
        }

        if (item.status === 'rejected') {
            return 'Your request was not approved by the admin.'
        }
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

function InboxCard({ item, onAccept, onReject }) {
    const isIncomingPending =
        item.is_incoming && item.status === 'pending'

    return (
        <div className={`request-card ${item.status}`}>
            <div className="request-header">
                <div>
                    <h3>{getInboxTitle(item)}</h3>
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
        </div>
    )
}

export default InboxCard