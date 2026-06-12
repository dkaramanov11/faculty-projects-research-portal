function ProjectInfoCard({
                             project,
                             isCreator,
                             onEdit,
                             onDelete
                         }) {
    return (
        <div className="details-card">
            <div className="card-header">
                <span className="badge">{project.type}</span>
                <span className={`status ${project.status}`}>
                    {project.status}
                </span>
            </div>

            <h1>{project.title}</h1>
            <p>{project.description}</p>

            <p className="category-text">
                Category: {project.category ? project.category.name : 'No category'}
            </p>

            <p className="creator-text">
                Created by:{' '}
                {project.creator
                    ? `${project.creator.full_name} (${project.creator.role})`
                    : 'Unknown'}
            </p>

            {isCreator && (
                <div className="project-actions">
                    <button onClick={onEdit}>Edit Project</button>
                    <button className="danger" onClick={onDelete}>
                        Delete Project
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProjectInfoCard