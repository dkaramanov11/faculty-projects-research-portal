import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
    getProject,
    deleteProject,
    addParticipant,
    removeParticipant,
    updateProject
} from '../services/projectService'

import { getUsers } from '../services/userService'
import ProjectForm from '../components/ProjectForm'
import { getCategories } from '../services/categoryService'
import { useAuth } from '../context/AuthContext'

function ProjectDetailsPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [project, setProject] = useState(null)
    const [users, setUsers] = useState([])
    const [selectedUserId, setSelectedUserId] = useState('')
    const [showEditForm, setShowEditForm] = useState(false)
    const [categories, setCategories] = useState([])
    const { user } = useAuth()

    const [form, setForm] = useState({
        title: '',
        description: '',
        type: 'project',
        status: 'active',
        category_id: ''
    })

    useEffect(() => {
        loadProject()
        loadUsers()
        loadCategories()
    }, [id])

    function loadProject() {
        getProject(id).then(data => setProject(data.data))
    }

    function loadUsers() {
        getUsers().then(data => setUsers(data.data))
    }

    function handleDelete() {
        deleteProject(id).then(() => {
            navigate('/projects')
        })
    }

    function handleAddParticipant() {
        if (!selectedUserId) {
            return
        }

        addParticipant(id, selectedUserId).then(() => {
            setSelectedUserId('')
            loadProject()
        })
    }

    function handleRemoveParticipant(userId) {
        removeParticipant(id, userId).then(() => {
            loadProject()
        })
    }

    if (!project) {
        return <p>Loading project...</p>
    }

    function loadCategories() {
        getCategories().then(data => setCategories(data.data))
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function openEditForm() {
        setForm({
            title: project.title,
            description: project.description,
            type: project.type,
            status: project.status,
            category_id: project.category ? project.category.id : ''
        })

        setShowEditForm(true)
    }

    function closeEditForm() {
        setShowEditForm(false)
    }

    function handleUpdate(e) {
        e.preventDefault()

        updateProject(id, form).then(() => {
            loadProject()
            setShowEditForm(false)
        })
    }

    return (
        <section className="details-page">
            <button className="secondary" onClick={() => navigate('/projects')}>
                Back to Projects
            </button>

            <div className="details-card">
                <div className="card-header">
                    <span className="badge">{project.type}</span>
                    <span className={`status ${project.status}`}>
                        {project.status}
                    </span>
                </div>

                <h1>{project.title}</h1>
                <p>{project.description}</p>

                <p className="category-text">
                    Category: {project.category ? project.category.name : 'No category'}
                </p>

                {user && (
                    <div className="card-actions">
                        <button onClick={openEditForm}>Edit Project</button>
                        <button className="danger" onClick={handleDelete}>
                            Delete Project
                        </button>
                    </div>
                )}
            </div>

            <div className="details-card">
                <h2>Participants</h2>

                {project.participants && project.participants.length > 0 ? (
                    <ul className="participants-list">
                        {project.participants.map(participant => (
                            <li key={participant.id}>
                                <span>
                                    {participant.full_name} ({participant.role})
                                </span>

                                {user && (
                                    <button
                                        className="small-danger"
                                        onClick={() => handleRemoveParticipant(participant.id)}
                                    >
                                        Remove
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="empty-text">No participants yet.</p>
                )}

                {showEditForm && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <ProjectForm
                                form={form}
                                editingId={project.id}
                                categories={categories}
                                onChange={handleChange}
                                onSubmit={handleUpdate}
                                onCancel={closeEditForm}
                            />
                        </div>
                    </div>
                )}

                {user && (
                    <div className="participant-form">
                        <select
                            value={selectedUserId}
                            onChange={e => setSelectedUserId(e.target.value)}
                        >
                            <option value="">Select user</option>

                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.full_name} - {user.role}
                                </option>
                            ))}
                        </select>

                        <button onClick={handleAddParticipant}>Add Participant</button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ProjectDetailsPage