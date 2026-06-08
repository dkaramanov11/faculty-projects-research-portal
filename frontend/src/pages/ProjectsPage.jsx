import { useEffect, useState } from 'react'

import Header from '../components/Navbar'
import ProjectForm from '../components/ProjectForm'
import ProjectList from '../components/ProjectList'

import {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    addParticipant,
    removeParticipant
} from '../services/projectService'

import { getCategories } from '../services/categoryService'
import { getUsers } from '../services/userService'

function ProjectsPage() {
    const [projects, setProjects] = useState([])
    const [categories, setCategories] = useState([])
    const [users, setUsers] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [showForm, setShowForm] = useState(false)

    const [form, setForm] = useState({
        title: '',
        description: '',
        type: 'project',
        status: 'active',
        category_id: ''
    })

    useEffect(() => {
        loadProjects()
        loadCategories()
        loadUsers()
    }, [])

    function loadProjects() {
        getProjects().then(data => setProjects(data.data))
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

    function resetForm() {
        setForm({
            title: '',
            description: '',
            type: 'project',
            status: 'active',
            category_id: ''
        })

        setEditingId(null)
        setShowForm(false)
    }

    function handleSubmit(e) {
        e.preventDefault()

        const request = editingId
            ? updateProject(editingId, form)
            : createProject(form)

        request.then(() => {
            loadProjects()
            resetForm()
        })
    }

    function handleEdit(project) {
        setEditingId(project.id)
        setShowForm(true)

        setForm({
            title: project.title,
            description: project.description,
            type: project.type,
            status: project.status,
            category_id: project.category ? project.category.id : ''
        })
    }

    function handleDelete(id) {
        deleteProject(id).then(() => loadProjects())
    }

    function handleAddParticipant(projectId, userId) {
        addParticipant(projectId, userId)
            .then(() => loadProjects())
    }

    function handleRemoveParticipant(projectId, userId) {
        removeParticipant(projectId, userId)
            .then(() => loadProjects())
    }


    function loadUsers() {
        getUsers()
            .then(data => setUsers(data.data))
    }

    return (
        <>
            <button className="add-button" onClick={() => setShowForm(true)}>
                Add New Project
            </button>

            {showForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <ProjectForm
                            form={form}
                            editingId={editingId}
                            categories={categories}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            onCancel={resetForm}
                        />
                    </div>
                </div>
            )}

            <ProjectList
                projects={projects}
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddParticipant={handleAddParticipant}
                onRemoveParticipant={handleRemoveParticipant}
            />
        </>
    )
}

export default ProjectsPage