import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { sendProjectRequest } from '../services/projectRequestService'
import { inviteUserToProject } from '../services/projectRequestService'

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

function ProjectDetailsPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [project, setProject] = useState(null)
    const [users, setUsers] = useState([])
    const [selectedUserId, setSelectedUserId] = useState('')
    const [showEditForm, setShowEditForm] = useState(false)
    const [categories, setCategories] = useState([])
    const { user, token } = useAuth()
    const [requestMessage, setRequestMessage] = useState('')
    const [requestSent, setRequestSent] = useState(false)
    const [selectedProfessorId, setSelectedProfessorId] = useState('')
    const [inviteMessage, setInviteMessage] = useState('')
    const [studentSearch, setStudentSearch] = useState('')
    const [selectedStudentId, setSelectedStudentId] = useState('')
    const [studentInviteMessage, setStudentInviteMessage] = useState('')

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
        deleteProject(id, token).then(() => {
            navigate('/projects')
        })
    }

    function handleAddParticipant() {
        if (!selectedUserId) {
            return
        }

        addParticipant(id, selectedUserId, token).then(() => {
            setSelectedUserId('')
            loadProject()
        })
    }

    function handleRemoveParticipant(userId) {
        removeParticipant(id, userId, token).then(() => {
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

        updateProject(id, form, token).then(() => {
            loadProject()
            setShowEditForm(false)
        })
    }

    function handleSendRequest() {
        sendProjectRequest(id, requestMessage, token).then(() => {
            setRequestMessage('')
            alert('Request sent successfully.')
        })
    }

    function handleSendRequest() {
        sendProjectRequest(id, requestMessage, token).then(() => {
            setRequestMessage('')
            setRequestSent(true)
        })
    }

    function isProjectParticipant(userId) {
        return project.participants?.some(participant => participant.id === userId)
    }
    const isCreator = user && project.creator && user.id === project.creator.id
    const isParticipant =
        user &&
        project.participants &&
        project.participants.some(participant => participant.id === user.id)
    const professors = users.filter(user =>
        user.role === 'professor' &&
        !isProjectParticipant(user.id)
    )
    const students = users.filter(user =>
        user.role === 'student' &&
        !isProjectParticipant(user.id) &&
        user.full_name.toLowerCase().includes(studentSearch.toLowerCase())
    )
    const isProfessorParticipant =
        user &&
        project.participants &&
        project.participants.some(
            participant =>
                participant.id === user.id &&
                participant.role === 'professor'
        )
    function handleInviteStudent() {
        inviteUserToProject(
            id,
            selectedStudentId,
            studentInviteMessage,
            token
        ).then(() => {
            setSelectedStudentId('')
            setStudentSearch('')
            setStudentInviteMessage('')
            alert('Student invitation sent successfully.')
        })
    }


    const canManageProject = isCreator || isProfessorParticipant

    function handleInviteProfessor() {
        inviteUserToProject(
            id,
            selectedProfessorId,
            inviteMessage,
            token
        ).then(() => {
            setSelectedProfessorId('')
            setInviteMessage('')
            alert('Invitation sent successfully.')
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

                <p className="creator-text">
                    Created by:{' '}
                    {project.creator
                        ? `${project.creator.full_name} (${project.creator.role})`
                        : 'Unknown'}
                </p>

                {isCreator && (
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

                {canManageProject  && (
                    <div className="details-card">
                        <h2>Add Professor</h2>

                        <select
                            value={selectedProfessorId}
                            onChange={e => setSelectedProfessorId(e.target.value)}
                        >
                            <option value="">Select professor</option>

                            {professors.map(professor => (
                                <option key={professor.id} value={professor.id}>
                                    {professor.full_name}
                                </option>
                            ))}
                        </select>

                        <textarea
                            placeholder="Invitation message..."
                            value={inviteMessage}
                            onChange={e => setInviteMessage(e.target.value)}
                        />

                        <button
                            onClick={handleInviteProfessor}
                            disabled={!selectedProfessorId}
                        >
                            Send Invitation
                        </button>
                    </div>
                )}

                {canManageProject && (
                    <div className="details-card">
                        <h2>Add Student</h2>

                        <input
                            placeholder="Search student by name..."
                            value={studentSearch}
                            onChange={e => setStudentSearch(e.target.value)}
                        />

                        {studentSearch && (
                            <div className="search-results">
                                {students.map(student => (
                                    <button
                                        key={student.id}
                                        type="button"
                                        className="search-result"
                                        onClick={() => setSelectedStudentId(student.id)}
                                    >
                                        {student.full_name} (@{student.username})
                                    </button>
                                ))}
                            </div>
                        )}

                        <textarea
                            placeholder="Invitation message..."
                            value={studentInviteMessage}
                            onChange={e => setStudentInviteMessage(e.target.value)}
                        />

                        <button
                            onClick={handleInviteStudent}
                            disabled={!selectedStudentId}
                        >
                            Send Student Invitation
                        </button>
                    </div>
                )}

                {user && project.creator && !isCreator && !isParticipant && (
                    <div className="details-card">
                        <h2>Send Participation Request</h2>

                        <textarea
                            placeholder="Write a short message..."
                            value={requestMessage}
                            onChange={e => setRequestMessage(e.target.value)}
                        />

                        {requestSent ? (
                            <p className="success-text">Request sent.</p>
                        ) : (
                            <button onClick={handleSendRequest}>
                                Send Request
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}

export default ProjectDetailsPage