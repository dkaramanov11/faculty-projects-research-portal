import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

function RegisterPage() {
    const navigate = useNavigate()
    const { registerUser } = useAuth()

    const [form, setForm] = useState({
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        role: 'student'
    })

    const [errors, setErrors] = useState({})
    const [generalError, setGeneralError] = useState('')

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        setErrors({})
        setGeneralError('')

        const response = await registerUser(form)

        if (!response.ok) {
            setErrors(response.errors || {})

            if (
                !response.errors ||
                Object.keys(response.errors).length === 0
            ) {
                setGeneralError(
                    response.message || 'Registration failed.'
                )
            }

            return
        }

        navigate('/projects')
    }

    return (
        <section className="auth-page">
            <div className="auth-card">
                <h1>Register</h1>

                {generalError && (
                    <div className="login-error">
                        {generalError}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        className={errors.name ? 'input-error' : ''}
                    />

                    {errors.name && (
                        <p className="field-error">
                            {errors.name[0]}
                        </p>
                    )}

                    <input
                        name="surname"
                        placeholder="Surname"
                        value={form.surname}
                        onChange={handleChange}
                        className={errors.surname ? 'input-error' : ''}
                    />

                    {errors.surname && (
                        <p className="field-error">
                            {errors.surname[0]}
                        </p>
                    )}

                    <input
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        className={errors.username ? 'input-error' : ''}
                    />

                    {errors.username && (
                        <p className="field-error">
                            {errors.username[0]}
                        </p>
                    )}

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className={errors.email ? 'input-error' : ''}
                    />

                    {errors.email && (
                        <p className="field-error">
                            {errors.email[0]}
                        </p>
                    )}

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className={errors.password ? 'input-error' : ''}
                    />

                    {errors.password && (
                        <p className="field-error">
                            {errors.password[0]}
                        </p>
                    )}

                    {errors.role && (
                        <p className="field-error">
                            {errors.role[0]}
                        </p>
                    )}

                    <button type="submit">
                        Register
                    </button>
                </form>
            </div>
        </section>
    )
}

export default RegisterPage