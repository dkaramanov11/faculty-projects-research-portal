import ProjectCard from './ProjectCard'

function ProjectList({ projects, onEdit, onDelete }) {
    return (
        <section>
            <h2>Projects</h2>

            <div className="projects-grid">
                {projects.map(project => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </section>
    )
}

export default ProjectList