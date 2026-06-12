import { Link } from 'react-router-dom'

function ProjectCard({ project }) {
    return (
        <Link
            to={`/projects/${project.id}`}
            className="project-card-link"
        >
            <div className="project-card">

                <div className="card-header">
                    <span className="badge">
                        {project.type}
                    </span>

                    <span className={`status ${project.status}`}>
                        {project.status}
                    </span>
                </div>

                <h3>{project.title}</h3>

                <p className="project-description">
                    {project.description}
                </p>

                <div className="project-meta-row">

                    <div className="project-meta">
                        <p>
                            Category:{' '}
                            <strong>
                                {project.category
                                    ? project.category.name
                                    : 'No category'}
                            </strong>
                        </p>

                        <p>
                            Participants:{' '}
                            <strong>
                                {project.participants
                                    ? project.participants.length
                                    : 0}
                            </strong>
                        </p>
                    </div>

                    <div className="details-arrow">
                        →
                    </div>

                </div>

            </div>
        </Link>
    )
}

export default ProjectCard