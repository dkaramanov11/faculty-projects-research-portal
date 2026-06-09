import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import ProjectsPage from './pages/ProjectsPage'
import CategoriesPage from './pages/CategoriesPage'
import UsersPage from './pages/UsersPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import UserDetailsPage from './pages/UserDetailsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MyProfilePage from './pages/MyProfilePage'
import RequestsPage from './pages/RequestsPage'

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
                    <Route path="/requests" element={<RequestsPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App