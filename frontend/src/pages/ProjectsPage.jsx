import ProjectForm from '../components/project/ProjectForm.jsx'
import ProjectList from '../components/project/ProjectList.jsx'
import ProjectsHeader from '../components/project/ProjectsHeader.jsx'
import ProjectsToolbar from '../components/project/ProjectsToolbar.jsx'
import { useProjects } from '../hooks/useProjects'
import Pagination from '../components/shared/Pagination.jsx'

function ProjectsPage() {
    const projects = useProjects()

    return (
        <div className="container">
            <ProjectsHeader projects={projects} />

            <ProjectsToolbar projects={projects} />

            {projects.showForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <ProjectForm
                            form={projects.form}
                            editingId={projects.editingId}
                            categories={projects.categories}
                            onChange={projects.handleChange}
                            onSubmit={projects.handleSubmit}
                            onCancel={projects.resetForm}
                        />
                    </div>
                </div>
            )}

            <ProjectList
                projects={projects.paginatedProjects}
                users={projects.users}
                onEdit={projects.handleEdit}
                onDelete={projects.handleDelete}
            />

            <Pagination
                currentPage={projects.currentPage}
                totalPages={projects.totalPages}
                onPageChange={projects.setCurrentPage}
            />
        </div>
    )
}

export default ProjectsPage