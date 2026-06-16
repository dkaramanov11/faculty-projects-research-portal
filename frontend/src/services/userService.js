const API_URL = 'http://127.0.0.1:8000/api/users'

export function getUsers() {
    return fetch(API_URL)
        .then(response => response.json())
}
export function getUser(id) {
    return fetch(`${API_URL}/${id}`)
        .then(response => response.json())
}
export function deleteUser(id, token) {
    return fetch(
        `http://127.0.0.1:8000/api/users/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    ).then(response => response.json())
}