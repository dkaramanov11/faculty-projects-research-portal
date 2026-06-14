import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

import {
    approveProjectCreationRequest,
    deleteProjectCreationRequest,
    getProjectCreationRequests,
    rejectProjectCreationRequest
} from '../services/projectCreationRequestService'

export function useAdminProjectRequests() {
    const { token } = useAuth()

    const [requests, setRequests] = useState([])

    useEffect(() => {
        loadRequests()
    }, [])

    function loadRequests() {
        getProjectCreationRequests(token)
            .then(data => setRequests(data.data))
    }

    function handleApprove(id) {
        approveProjectCreationRequest(id, token)
            .then(() => loadRequests())
    }

    function handleReject(id) {
        rejectProjectCreationRequest(id, token)
            .then(() => loadRequests())
    }

    function handleDelete(id) {
        deleteProjectCreationRequest(id, token)
            .then(() => loadRequests())
    }

    return {
        requests,
        handleApprove,
        handleReject,
        handleDelete
    }
}