import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

function LoginPage() {
    const navigate = useNavigate()
    const { loginUser } = useAuth()

    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const [generalError, setGeneralError] = useState('')
    const [errors, setErrors] = useState({})

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        setGeneralError('')
        setErrors({})

        const response = await loginUser(form)

        if (!response.ok) {
            setErrors(response.errors || {})

            if (
                !response.errors ||
                Object.keys(response.errors).length === 0
            ) {
                setGeneralError(
                    response.message ||
                    'Invalid username or password.'
                )
            }

            return
        }

        navigate('/projects')
    }

    return (
        <section className="auth-page">
            <div className="auth-card">
                <h1>Login</h1>

                {generalError && (
                    <div className="login-error">
                        {generalError}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                    />

                    {errors.username && (
                        <p className="field-error">{errors.username[0]}</p>
                    )}

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    {errors.password && (
                        <p className="field-error">{errors.password[0]}</p>
                    )}

                    <button type="submit">Login</button>
                </form>
            </div>
        </section>
    )
}

export default LoginPage