import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
    acceptProjectRequest,
    getProjectRequests,
    rejectProjectRequest
} from '../services/projectRequestService'

function RequestsPage() {
    const { token } = useAuth()
    const [requests, setRequests] = useState([])

    useEffect(() => {
        loadRequests()
    }, [])

    function loadRequests() {
        getProjectRequests(token)
            .then(data => setRequests(data.data))
    }

    function handleAccept(id) {
        acceptProjectRequest(id, token)
            .then(() => loadRequests())
    }

    function handleReject(id) {
        rejectProjectRequest(id, token)
            .then(() => loadRequests())
    }

    return (
        <section className="categories-page">
            <div className="page-header">
                <div>
                    <h1>Project Requests</h1>
                    <p>Manage participation requests for your projects.</p>
                </div>
            </div>

            <div className="category-list">
                {requests.map(request => (
                    <div className="category-row" key={request.id}>
                        <div>
                            <strong>{request.project.title}</strong>
                            <p>
                                From: {request.sender.full_name} ({request.sender.role})
                            </p>
                            <p>Status: {request.status}</p>
                            {request.message && <p>Message: {request.message}</p>}
                        </div>

                        {request.status === 'pending' && (
                            <div className="category-actions">
                                <button onClick={() => handleAccept(request.id)}>
                                    Accept
                                </button>

                                <button
                                    className="danger"
                                    onClick={() => handleReject(request.id)}
                                >
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default RequestsPage