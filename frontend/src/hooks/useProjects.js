import { useEffect, useState } from 'react'

import {
    getProjects,
    createProject,
    updateProject,
    deleteProject
} from '../services/projectService'

import { getCategories } from '../services/categoryService'
import { getUsers } from '../services/userService'
import { useAuth } from '../context/AuthContext'

export function useProjects() {
    const { user, token } = useAuth()

    const [projects, setProjects] = useState([])
    const [categories, setCategories] = useState([])
    const [users, setUsers] = useState([])

    const [editingId, setEditingId] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [selectedType, setSelectedType] = useState('all')

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

    function loadUsers() {
        getUsers().then(data => setUsers(data.data))
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
            ? updateProject(editingId, form, token)
            : createProject(form, token)

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
        deleteProject(id, token).then(() => loadProjects())
    }

    const filteredProjects = projects.filter(project => {
        if (selectedType === 'all') {
            return true
        }

        return project.type === selectedType
    })

    return {
        user,
        categories,
        users,

        form,
        editingId,
        showForm,
        setShowForm,

        selectedType,
        setSelectedType,

        filteredProjects,

        handleChange,
        handleSubmit,
        resetForm,
        handleEdit,
        handleDelete
    }
}