import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { createProfessorRoleRequest } from '../services/professorRoleRequestService'
import { getProfileProjects, updateProfile } from '../services/profileService'
import { createProject } from '../services/projectService'
import { getCategories } from '../services/categoryService'

export function useProfile() {
    const { user, token } = useAuth()

    const [showProfessorModal, setShowProfessorModal] = useState(false)
    const [professorMessage, setProfessorMessage] = useState('')
    const [requestSent, setRequestSent] = useState(false)

    const [activeTab, setActiveTab] = useState('created')

    const [createdProjects, setCreatedProjects] = useState([])
    const [participatingProjects, setParticipatingProjects] = useState([])
    const [pendingProjects, setPendingProjects] = useState([])

    const [showProjectModal, setShowProjectModal] = useState(false)
    const [categories, setCategories] = useState([])

    const [projectForm, setProjectForm] = useState({
        title: '',
        description: '',
        type: 'project',
        status: 'active',
        category_id: ''
    })

    const [showEditModal, setShowEditModal] = useState(false)

    const [editForm, setEditForm] = useState({
        username: '',
        email: '',
        name: '',
        surname: ''
    })

    useEffect(() => {
        if (token) {
            loadProfileProjects()
            loadCategories()
        }

    }, [token])

    function loadCategories() {
        getCategories()
            .then(data => setCategories(data.data || []))
    }

    function handleProjectChange(e) {
        setProjectForm({
            ...projectForm,
            [e.target.name]: e.target.value
        })
    }
    function loadProfileProjects() {
        getProfileProjects(token).then(data => {
            setCreatedProjects(data.created_projects || [])
            setParticipatingProjects(data.participating_projects || [])
            setPendingProjects(data.pending_projects || [])
        })
    }

    function handleProfessorRoleRequest() {
        createProfessorRoleRequest(professorMessage, token)
            .then(() => {
                setProfessorMessage('')
                setRequestSent(true)
                setShowProfessorModal(false)
            })
    }

    function openEditModal() {
        setEditForm({
            username: user.username,
            email: user.email,
            name: user.name,
            surname: user.surname
        })

        setShowEditModal(true)
    }

    function handleEditChange(e) {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        })
    }

    function handleProfileUpdate(e) {
        e.preventDefault()

        updateProfile(editForm, token)
            .then(() => {
                setShowEditModal(false)
                window.location.reload()
            })
    }

    function resetProjectForm() {
        setProjectForm({
            title: '',
            description: '',
            type: 'project',
            status: 'active',
            category_id: ''
        })

        setShowProjectModal(false)
    }

    function handleCreateProject(e) {
        e.preventDefault()

        createProject(projectForm, token)
            .then(() => {
                resetProjectForm()
                loadProfileProjects()
            })
    }

    return {
        user,

        showProfessorModal,
        setShowProfessorModal,

        professorMessage,
        setProfessorMessage,

        requestSent,
        handleProfessorRoleRequest,

        activeTab,
        setActiveTab,

        createdProjects,
        participatingProjects,
        pendingProjects,

        showEditModal,
        setShowEditModal,
        editForm,
        openEditModal,
        handleEditChange,
        handleProfileUpdate,

        showProjectModal,
        setShowProjectModal,
        categories,
        projectForm,
        handleProjectChange,
        handleCreateProject,
        resetProjectForm,
    }
}