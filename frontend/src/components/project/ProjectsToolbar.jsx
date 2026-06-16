import ProjectTabs from './ProjectTabs'

function ProjectsToolbar({ projects }) {
    return (
        <div className="projects-toolbar">
            <input
                type="text"
                placeholder="Search projects..."
                value={projects.searchTerm}
                onChange={(e) => projects.setSearchTerm(e.target.value)}
                className="project-search"
            />

            <ProjectTabs projects={projects} />

            <select
                className="category-filter"
                value={projects.selectedCategory}
                onChange={(e) => projects.setSelectedCategory(e.target.value)}
            >
                <option value="all">All Categories</option>

                {projects.categories.map(category => (
                    <option
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default ProjectsToolbar