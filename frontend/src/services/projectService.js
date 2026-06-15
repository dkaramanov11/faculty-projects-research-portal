const API_URL = 'http://127.0.0.1:8000/api/projects'

export function getProjects() {
    return fetch(API_URL)
        .then(response => response.json())
}

export function getPendingProjects(token) {
    return fetch('http://127.0.0.1:8000/api/admin/pending-projects', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}

export function getProject(id) {
    return fetch(`${API_URL}/${id}`)
        .then(response => response.json())
}

export function createProject(project, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(project)
    }).then(response => response.json())
}

export function updateProject(id, project, token) {
    return fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(project)
    }).then(response => response.json())
}

export function deleteProject(id, token) {
    return fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export function addParticipant(projectId, userId, token) {
    return fetch(`${API_URL}/${projectId}/participants/${userId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}

export function removeParticipant(projectId, userId, token) {
    return fetch(`${API_URL}/${projectId}/participants/${userId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}
