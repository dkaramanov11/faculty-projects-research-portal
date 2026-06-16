function ProjectsHeader({ projects }) {
    return (
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
    )
}

export default ProjectsHeader