const API_URL = 'http://127.0.0.1:8000/api'

export function sendProjectRequest(projectId, message, token) {
    return fetch(`${API_URL}/projects/${projectId}/requests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message })
    }).then(response => response.json())
}

export function getProjectRequests(token) {
    return fetch(`${API_URL}/project-requests`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}

export function acceptProjectRequest(requestId, token) {
    return fetch(`${API_URL}/project-requests/${requestId}/accept`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}

export function rejectProjectRequest(requestId, token) {
    return fetch(`${API_URL}/project-requests/${requestId}/reject`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}

export function inviteUserToProject(projectId, userId, message, token) {
    return fetch(
        `http://127.0.0.1:8000/api/projects/${projectId}/invite/${userId}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ message })
        }
    ).then(response => response.json())
}