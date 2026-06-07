function ProjectCard({ project, onEdit, onDelete }) {
    return (
        <div className="project-card">
            <div className="card-header">
                <span className="badge">{project.type}</span>
                <span className={`status ${project.status}`}>
                    {project.status}
                </span>
            </div>

            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <p className="category-text">
                Category: {project.category ? project.category.name : 'No category'}
            </p>

            <div className="card-actions">
                <button onClick={() => onEdit(project)}>Edit</button>
                <button className="danger" onClick={() => onDelete(project.id)}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ProjectCard