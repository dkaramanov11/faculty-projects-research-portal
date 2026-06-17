function ProjectsHeader({ projects }) {
    const firstName = projects.user?.name
    const isAdmin = projects.user?.role === 'admin'

    return (
        <section className="home-projects-header">

            <div>

                {isAdmin ? (
                    <>
        <span className="hero-label">
            ADMIN DASHBOARD
        </span>

                        <h1>
                            System Overview
                        </h1>

                        <h2>
                            Manage projects, users and platform requests.
                        </h2>

                        <p>
                            Review project activity, monitor users, and handle pending requests from one central place.
                        </p>
                    </>
                ) : (
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

                {projects.user && !isAdmin && (
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