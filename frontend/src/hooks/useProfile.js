import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { createProfessorRoleRequest } from '../services/professorRoleRequestService'

export function useProfile() {
    const { user, token } = useAuth()

    const [showProfessorModal, setShowProfessorModal] = useState(false)
    const [professorMessage, setProfessorMessage] = useState('')
    const [requestSent, setRequestSent] = useState(false)

    function handleProfessorRoleRequest() {
        createProfessorRoleRequest(professorMessage, token)
            .then(() => {
                setProfessorMessage('')
                setRequestSent(true)
                setShowProfessorModal(false)
            })
    }

    return {
        user,

        showProfessorModal,
        setShowProfessorModal,

        professorMessage,
        setProfessorMessage,

        requestSent,
        handleProfessorRoleRequest
    }
}