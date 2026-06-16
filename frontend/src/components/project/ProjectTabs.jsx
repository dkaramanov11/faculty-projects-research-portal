function ProjectTabs({ projects }) {
    return (
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
    )
}

export default ProjectTabs