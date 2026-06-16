import { useEffect, useState } from 'react'

import {
    getProjects,
    getPendingProjects,
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
    const isAdmin = user && user.role === 'admin'
    const [pendingProjects, setPendingProjects] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 9

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

        if (isAdmin) {
            loadPendingProjects()
        }

    }, [isAdmin])

    function loadProjects() {
        getProjects().then(data => setProjects(data.data))
    }

    function loadPendingProjects() {
        getPendingProjects(token)
            .then(data => setPendingProjects(data.data))
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

    const baseProjects =
        selectedType === 'pending'
            ? pendingProjects
            : projects

    const filteredProjects = baseProjects.filter(project => {
        const matchesType =
            selectedType === 'all' ||
            selectedType === 'pending' ||
            project.type === selectedType

        const matchesSearch =
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory =
            selectedCategory === 'all' ||
            project.category?.id === Number(selectedCategory)

        return matchesType && matchesSearch && matchesCategory
    })

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    const paginatedProjects = filteredProjects.slice(startIndex, endIndex)

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedType, searchTerm, selectedCategory])

    return {
        user,
        categories,
        users,
        projects,

        form,
        editingId,
        showForm,
        setShowForm,

        selectedType,
        setSelectedType,

        filteredProjects,

        isAdmin,
        pendingProjects,
        loadPendingProjects,

        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,

        currentPage,
        setCurrentPage,
        itemsPerPage,
        totalPages,
        paginatedProjects,

        handleChange,
        handleSubmit,
        resetForm,
        handleEdit,
        handleDelete
    }
}