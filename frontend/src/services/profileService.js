export function getProfileProjects(token) {
    return fetch('http://127.0.0.1:8000/api/profile/projects', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}
export function updateProfile(form, token) {
    return fetch('http://127.0.0.1:8000/api/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
    }).then(response => response.json())
}