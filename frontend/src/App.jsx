import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './styles/main.css'

import Navbar from './components/Navbar'
import ProjectsPage from './pages/ProjectsPage'
import CategoriesPage from './pages/CategoriesPage'
import UsersPage from './pages/UsersPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import UserDetailsPage from './pages/UserDetailsPage'
import LoginPage from './pages/AuthPages/LoginPage.jsx'
import RegisterPage from './pages/AuthPages/RegisterPage.jsx'
import MyProfilePage from './pages/MyProfilePage'
import InboxPage from './pages/InboxPage'
import AdminRequestsPage from "./pages/AdminRequestsPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <div className="page">
                <Navbar />

                <Routes>
                    <Route path="/" element={<Navigate to="/projects" />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/projects/:id" element={<ProjectDetailsPage />} />
                    <Route path="/users/:id" element={<UserDetailsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<MyProfilePage />} />
                    <Route path="/inbox" element={<InboxPage />} />
                    <Route path="/admin/requests" element={<AdminRequestsPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App