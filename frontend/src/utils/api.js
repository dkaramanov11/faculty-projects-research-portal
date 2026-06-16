export async function apiRequest(url, options = {}) {
    const response = await fetch(url, options)

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
        return {
            ok: false,
            status: response.status,
            message: data.message || 'Something went wrong.',
            errors: data.errors || {}
        }
    }

    return {
        ok: true,
        status: response.status,
        data
    }
}