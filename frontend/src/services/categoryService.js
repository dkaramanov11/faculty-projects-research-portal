const API_URL = 'http://127.0.0.1:8000/api/categories'

export function getCategories() {
    return fetch(API_URL)
        .then(response => response.json())
}

export function createCategory(category) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(category)
    }).then(response => response.json())
}

export function updateCategory(id, category) {
    return fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(category)
    }).then(response => response.json())
}

export function deleteCategory(id) {
    return fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    })
}