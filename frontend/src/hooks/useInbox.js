import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
    acceptProjectRequest,
    getInbox,
    rejectProjectRequest
} from '../services/projectRequestService'

export function useInbox() {
    const { token } = useAuth()
    const [items, setItems] = useState([])

    useEffect(() => {
        loadInbox()
    }, [])

    function loadInbox() {
        getInbox(token).then(data => setItems(data.data))
    }

    function handleAccept(id) {
        acceptProjectRequest(id, token).then(() => loadInbox())
    }

    function handleReject(id) {
        rejectProjectRequest(id, token).then(() => loadInbox())
    }

    return {
        items,
        handleAccept,
        handleReject
    }
}