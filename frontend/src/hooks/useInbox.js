import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
    acceptProjectRequest,
    getInbox,
    rejectProjectRequest
} from '../services/projectRequestService'
import { markInboxAsRead } from '../services/inboxService'
import { deleteNotification } from '../services/inboxService'

export function useInbox() {
    const { token, setUnreadInboxCount } = useAuth()
    const [items, setItems] = useState([])

    useEffect(() => {
        loadInbox()

        markInboxAsRead(token)
            .then(() => {
                setUnreadInboxCount(0)
            })
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

    async function handleDelete(item) {
        if (!window.confirm('Delete this notification?')) {
            return
        }

        const type = item.inbox_type ?? 'project_request'

        console.log('Deleting notification:', {
            id: item.id,
            type: type,
            item: item
        })

        await deleteNotification(
            item.id,
            type,
            token
        )

        loadInbox()
    }

    return {
        items,
        handleAccept,
        handleReject,
        handleDelete
    }
}