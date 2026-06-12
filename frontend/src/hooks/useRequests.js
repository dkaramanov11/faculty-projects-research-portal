import { useEffect, useState } from 'react'

import { useAuth } from '../context/AuthContext'

import {
    acceptProjectRequest,
    getProjectRequests,
    rejectProjectRequest
} from '../services/projectRequestService'

export function useRequests() {
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

    return {
        requests,
        handleAccept,
        handleReject
    }
}