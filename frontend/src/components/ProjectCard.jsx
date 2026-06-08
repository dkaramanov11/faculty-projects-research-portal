import { Link } from 'react-router-dom'

function ProjectCard({ project }) {
    return (
        <Link to={`/projects/${project.id}`} className="project-card-link">
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

                <p className="participants-count">
                    Participants: {project.participants ? project.participants.length : 0}
                </p>
            </div>
        </Link>
    )
}

export default ProjectCard