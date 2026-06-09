import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
    const navigate = useNavigate()
    const { loginUser } = useAuth()

    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        loginUser(form).then(() => {
            navigate('/projects')
        })
    }

    return (
        <section className="auth-page">
            <div className="auth-card">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Login</button>
                </form>
            </div>
        </section>
    )
}

export default LoginPage