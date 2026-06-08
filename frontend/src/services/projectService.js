const API_URL = 'http://127.0.0.1:8000/api/projects'

export function getProjects() {
    return fetch(API_URL).then(response => response.json())
}

export function getProject(id) {
    return fetch(`${API_URL}/${id}`)
        .then(response => response.json())
}

export function createProject(project) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(project)
    }).then(response => response.json())
}

export function updateProject(id, project) {
    return fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(project)
    }).then(response => response.json())
}

export function deleteProject(id) {
    return fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    })
}

export function addParticipant(projectId, userId) {
    return fetch(`${API_URL}/${projectId}/participants/${userId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => response.json())
}

export function removeParticipant(projectId, userId) {
    return fetch(`${API_URL}/${projectId}/participants/${userId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => response.json())
}