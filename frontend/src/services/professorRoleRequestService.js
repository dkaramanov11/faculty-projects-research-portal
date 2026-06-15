export function createProfessorRoleRequest(message, token) {
    return fetch(
        'http://127.0.0.1:8000/api/professor-role-requests',
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            body: JSON.stringify({
                message
            })
        }
    ).then(response => response.json())
}

const ADMIN_API_URL = 'http://127.0.0.1:8000/api/admin/professor-role-requests'

export function getProfessorRoleRequests(token) {
    return fetch(ADMIN_API_URL, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}

export function approveProfessorRoleRequest(id, token) {
    return fetch(`${ADMIN_API_URL}/${id}/approve`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}

export function rejectProfessorRoleRequest(id, token) {
    return fetch(`${ADMIN_API_URL}/${id}/reject`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}

export function deleteProfessorRoleRequest(id, token) {
    return fetch(`${ADMIN_API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}