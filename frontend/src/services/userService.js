const API_URL = 'http://127.0.0.1:8000/api/users'

export function getUsers() {
    return fetch(API_URL)
        .then(response => response.json())
}