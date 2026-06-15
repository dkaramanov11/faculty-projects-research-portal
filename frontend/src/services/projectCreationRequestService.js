const API_URL = 'http://127.0.0.1:8000/api/admin/project-creation-requests'

export function getProjectCreationRequests(token) {
    return fetch(API_URL, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}

export function approveProjectCreationRequest(id, token) {
    return fetch(`${API_URL}/${id}/approve`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}

export function rejectProjectCreationRequest(id, token) {
    return fetch(`${API_URL}/${id}/reject`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}

export function deleteProjectCreationRequest(id, token) {
    return fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}
export function approveProjectByProjectId(projectId, token) {
    return fetch(
        `http://127.0.0.1:8000/api/admin/projects/${projectId}/approve`,
        {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    ).then(response => response.json())
}

export function rejectProjectByProjectId(projectId, token) {
    return fetch(
        `http://127.0.0.1:8000/api/admin/projects/${projectId}/reject`,
        {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    ).then(response => response.json())
}