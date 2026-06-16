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

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        registerUser(form).then(() => {
            navigate('/projects')
        })
    }

    return (
        <section className="auth-page">
            <div className="auth-card">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                    <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                    <input name="surname" placeholder="Surname" value={form.surname} onChange={handleChange} required />
                    <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
                    <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />

                    <select name="role" value={form.role} onChange={handleChange}>
                        <option value="student">Student</option>
                        <option value="professor">Professor</option>
                    </select>

                    <button type="submit">Register</button>
                </form>
            </div>
        </section>
    )
}

export default RegisterPage