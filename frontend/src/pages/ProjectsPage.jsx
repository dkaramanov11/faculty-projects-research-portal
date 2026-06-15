import ProjectForm from '../components/project/ProjectForm.jsx'
import ProjectList from '../components/project/ProjectList.jsx'
import { useProjects } from '../hooks/useProjects'

function ProjectsPage() {
    const projects = useProjects()

    return (
        <>
            <div className="container">
                <section className="projects-header">
                    <div>
                        <h1>Projects</h1>
                        <div className="title-line"></div>
                        <p>Browse and manage all faculty projects and research papers.</p>
                    </div>

                    {projects.user && (
                        <button
                            className="add-button"
                            onClick={() => projects.setShowForm(true)}
                        >
                            + Add New Project
                        </button>
                    )}
                </section>
                <div className="project-tabs">

                    {projects.isAdmin && (
                        <button
                            className={projects.selectedType === 'pending' ? 'active-tab' : ''}
                            onClick={() => projects.setSelectedType('pending')}
                        >
                            Pending Projects
                        </button>
                    )}

                    <button
                        className={projects.selectedType === 'all' ? 'active-tab' : ''}
                        onClick={() => projects.setSelectedType('all')}
                    >
                        All
                    </button>
                    <button
                        className={projects.selectedType === 'project' ? 'active-tab' : ''}
                        onClick={() => projects.setSelectedType('project')}
                    >
                        Projects
                    </button>

                    <button
                        className={projects.selectedType === 'research' ? 'active-tab' : ''}
                        onClick={() => projects.setSelectedType('research')}
                    >
                        Research Papers
                    </button>
                </div>

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
                    projects={projects.filteredProjects}
                    users={projects.users}
                    onEdit={projects.handleEdit}
                    onDelete={projects.handleDelete}
                />
            </div>

        </>
    )
}

export default ProjectsPage