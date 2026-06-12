import RequestCard from './RequestCard'

function RequestList({ requests, onAccept, onReject }) {
    if (requests.length === 0) {
        return (
            <div className="details-card">
                <p>No project requests yet.</p>
            </div>
        )
    }

    return (
        <div className="request-list">
            {requests.map(request => (
                <RequestCard
                    key={request.id}
                    request={request}
                    onAccept={onAccept}
                    onReject={onReject}
                />
            ))}
        </div>
    )
}

export default RequestList