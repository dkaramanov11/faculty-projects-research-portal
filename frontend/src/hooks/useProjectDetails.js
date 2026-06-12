import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
    getProject,
    deleteProject,
    updateProject
} from '../services/projectService'

import { getUsers } from '../services/userService'
import { getCategories } from '../services/categoryService'
import {
    sendProjectRequest,
    inviteUserToProject
} from '../services/projectRequestService'

import { useAuth } from '../context/AuthContext'

export function useProjectDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user, token } = useAuth()

    const [project, setProject] = useState(null)
    const [users, setUsers] = useState([])
    const [categories, setCategories] = useState([])

    const [showEditModal, setShowEditModal] = useState(false)
    const [showRequestModal, setShowRequestModal] = useState(false)
    const [showProfessorModal, setShowProfessorModal] = useState(false)
    const [showStudentModal, setShowStudentModal] = useState(false)

    const [requestMessage, setRequestMessage] = useState('')
    const [requestSent, setRequestSent] = useState(false)

    const [selectedProfessorId, setSelectedProfessorId] = useState('')
    const [professorInviteMessage, setProfessorInviteMessage] = useState('')

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

        setShowEditModal(true)
    }

    function handleUpdate(e) {
        e.preventDefault()

        updateProject(id, form, token).then(() => {
            loadProject()
            setShowEditModal(false)
        })
    }

    function handleDelete() {
        deleteProject(id, token).then(() => {
            navigate('/projects')
        })
    }

    function handleSendRequest() {
        sendProjectRequest(id, requestMessage, token).then(() => {
            setRequestMessage('')
            setRequestSent(true)
        })
    }

    function handleInviteProfessor() {
        inviteUserToProject(
            id,
            selectedProfessorId,
            professorInviteMessage,
            token
        ).then(() => {
            setSelectedProfessorId('')
            setProfessorInviteMessage('')
            setShowProfessorModal(false)
        })
    }

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
            setShowStudentModal(false)
        })
    }

    const isCreator =
        user &&
        project &&
        project.creator &&
        user.id === project.creator.id

    const isParticipant =
        user &&
        project &&
        project.participants &&
        project.participants.some(participant => participant.id === user.id)

    const isProfessorParticipant =
        user &&
        project &&
        project.participants &&
        project.participants.some(
            participant =>
                participant.id === user.id &&
                participant.role === 'professor'
        )

    const canManageProject = isCreator || isProfessorParticipant

    function isProjectParticipant(userId) {
        return project?.participants?.some(participant => participant.id === userId)
    }

    const professors = users.filter(user =>
        user.role === 'professor' &&
        !isProjectParticipant(user.id)
    )

    const students = users.filter(user =>
        user.role === 'student' &&
        !isProjectParticipant(user.id) &&
        user.full_name.toLowerCase().includes(studentSearch.toLowerCase())
    )

    const canSendRequest =
        user &&
        project &&
        project.creator &&
        !isCreator &&
        !isParticipant &&
        !requestSent

    return {
        navigate,
        user,
        project,
        categories,

        showEditModal,
        setShowEditModal,
        showRequestModal,
        setShowRequestModal,
        showProfessorModal,
        setShowProfessorModal,
        showStudentModal,
        setShowStudentModal,

        requestMessage,
        setRequestMessage,
        requestSent,

        selectedProfessorId,
        setSelectedProfessorId,
        professorInviteMessage,
        setProfessorInviteMessage,

        studentSearch,
        setStudentSearch,
        selectedStudentId,
        setSelectedStudentId,
        studentInviteMessage,
        setStudentInviteMessage,

        form,
        handleChange,
        openEditForm,
        handleUpdate,
        handleDelete,
        handleSendRequest,
        handleInviteProfessor,
        handleInviteStudent,

        isCreator,
        isParticipant,
        canManageProject,
        canSendRequest,
        professors,
        students
    }
}