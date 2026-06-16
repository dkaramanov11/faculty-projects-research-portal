function ProjectsHeader({ projects }) {
    const firstName = projects.user?.name

    return (
        <section className="home-projects-header">

            <div>

                {projects.user ? (
                    <>
                        <span className="hero-label">
                            FACULTY PROJECTS PORTAL
                        </span>
                        <h1>
                            Hello, {firstName} 👋
                        </h1>

                        <h2>
                            Where Ideas Become Projects.
                        </h2>

                        <p>
                            Explore active projects, discover research opportunities,
                            and collaborate with students and professors.
                        </p>
                    </>
                ) : (
                    <>
                        <span className="hero-label">
                            FACULTY PROJECTS PORTAL
                        </span>

                        <h1>
                            Where Ideas Become Projects.
                        </h1>

                        <p>
                            Explore active projects, discover research opportunities,
                            and collaborate with students and professors.
                        </p>
                    </>
                )}

            </div>

            <div className="hero-side-card">

                <div className="hero-stat">
                    <strong>{projects.users?.length || 0}</strong>
                    <span>Users</span>
                </div>

                <div className="hero-stat">
                    <strong>{projects.projects?.length || 0}</strong>
                    <span>Total Projects</span>
                </div>

                {projects.user && (
                    <button
                        className="hero-create-button"
                        onClick={() => projects.setShowForm(true)}
                    >
                        + Create Project
                    </button>
                )}
            </div>

        </section>
    )
}

export default ProjectsHeader