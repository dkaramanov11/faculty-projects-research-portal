export function getUnreadInboxCount(token) {
    return fetch('http://127.0.0.1:8000/api/inbox/unread-count', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}

export function markInboxAsRead(token) {
    return fetch('http://127.0.0.1:8000/api/inbox/mark-as-read', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}

export function deleteNotification(id, type, token) {
    return fetch(
        'http://127.0.0.1:8000/api/inbox/delete-notification',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id,
                type
            })
        }
    ).then(response => response.json())
}