import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getUnreadInboxCount } from '../services/inboxService'

export function useInboxNotifications() {
    const { user, token } = useAuth()

    const { unreadInboxCount, setUnreadInboxCount } = useAuth()

    const isAdmin = user?.role === 'admin'

    useEffect(() => {
        if (user && token && !isAdmin) {
            loadUnreadCount()
        }
    }, [user, token])

    function loadUnreadCount() {
        getUnreadInboxCount(token)
            .then(data =>
                setUnreadInboxCount(data.count || 0)
            )
    }



    return {
        unreadCount: unreadInboxCount,
        loadUnreadCount
    }
}