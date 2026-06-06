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