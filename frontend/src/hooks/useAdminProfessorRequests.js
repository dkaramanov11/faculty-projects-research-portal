import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

import {
    approveProfessorRoleRequest,
    deleteProfessorRoleRequest,
    getProfessorRoleRequests,
    rejectProfessorRoleRequest
} from '../services/professorRoleRequestService'

export function useAdminProfessorRequests() {
    const { token } = useAuth()

    const [requests, setRequests] = useState([])

    useEffect(() => {
        loadRequests()
    }, [])

    function loadRequests() {
        getProfessorRoleRequests(token)
            .then(data => setRequests(data.data || []))
    }

    function handleApprove(id) {
        approveProfessorRoleRequest(id, token)
            .then(() => loadRequests())
    }

    function handleReject(id) {
        rejectProfessorRoleRequest(id, token)
            .then(() => loadRequests())
    }

    function handleDelete(id) {
        deleteProfessorRoleRequest(id, token)
            .then(() => loadRequests())
    }

    return {
        requests,
        handleApprove,
        handleReject,
        handleDelete
    }
}