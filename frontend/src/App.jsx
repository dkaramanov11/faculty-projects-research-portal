import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import ProjectsPage from './pages/ProjectsPage'
import CategoriesPage from './pages/CategoriesPage'

function App() {
    return (
        <BrowserRouter>
            <div className="page">
                <Navbar />

                <Routes>
                    <Route path="/" element={<Navigate to="/projects" />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App