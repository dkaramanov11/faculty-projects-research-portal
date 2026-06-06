import { useEffect, useState } from 'react'
import './App.css'

import Header from './components/Header'
import ProjectForm from './components/ProjectForm'
import ProjectList from './components/ProjectList'

import {
    getProjects,
    createProject,
    updateProject,
    deleteProject
} from './services/projectService'

function App() {
    const [projects, setProjects] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [showForm, setShowForm] = useState(false)

    const [form, setForm] = useState({
        title: '',
        description: '',
        type: 'project',
        status: 'active'
    })

    useEffect(() => {
        loadProjects()
    }, [])

    function loadProjects() {
        getProjects()
            .then(data => setProjects(data.data))
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
            status: 'active'
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
            status: project.status
        })
    }

    function handleDelete(id) {
        deleteProject(id)
            .then(() => loadProjects())
    }

    return (
        <div className="page">
            <Header />

            <button className="add-button" onClick={() => setShowForm(true)}>
                Add New Project
            </button>

            {showForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <ProjectForm
                            form={form}
                            editingId={editingId}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            onCancel={resetForm}
                        />
                    </div>
                </div>
            )}

            <ProjectList
                projects={projects}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    )
}

export default App