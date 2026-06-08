import ProjectCard from './ProjectCard'

function ProjectList({
                         projects,
                         users,
                         onEdit,
                         onDelete,
                         onAddParticipant,
                         onRemoveParticipant
                     }) {
    return (
        <section>
            <h2>Projects</h2>

            <div className="projects-grid">
                {projects.map(project => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        users={users}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onAddParticipant={onAddParticipant}
                        onRemoveParticipant={onRemoveParticipant}
                    />
                ))}
            </div>
        </section>
    )
}

export default ProjectList