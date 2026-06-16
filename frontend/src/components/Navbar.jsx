import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const { user, logoutUser } = useAuth()

    const isAdmin = user?.role === 'admin'
    const isProfessor = user?.role === 'professor'

    const canManageCategories =
        isAdmin || isProfessor

    return (
        <div className="navbar-wrapper">

            <nav className="navbar">

                <div className="navbar-left">
                    <div className="navbar-logo">
                        🎓
                    </div>

                    <h2>Faculty Projects Portal</h2>
                </div>

                <div className="nav-links">

                    <NavLink
                        to="/projects"
                        className={({ isActive }) =>
                            isActive ? 'active' : ''
                        }
                    >
                        Projects
                    </NavLink>

                    {canManageCategories && (
                        <NavLink
                            to="/categories"
                            className={({ isActive }) =>
                                isActive ? 'active' : ''
                            }
                        >
                            Categories
                        </NavLink>
                    )}

                    {isAdmin && (
                        <NavLink
                            to="/users"
                            className={({ isActive }) =>
                                isActive ? 'active' : ''
                            }
                        >
                            Users
                        </NavLink>
                    )}

                    {user && !isAdmin && (
                        <NavLink
                            to="/inbox"
                            className={({ isActive }) =>
                                isActive ? 'active' : ''
                            }
                        >
                            Inbox
                        </NavLink>
                    )}

                    {isAdmin && (
                        <NavLink
                            to="/admin/requests"
                            className={({ isActive }) =>
                                isActive ? 'active' : ''
                            }
                        >
                            Admin Requests
                        </NavLink>
                    )}

                    {user ? (
                        <>
                            {!isAdmin && (
                                <NavLink
                                    to="/profile"
                                    className="nav-user"
                                >
                                    {user.full_name}
                                </NavLink>
                            )}

                            <button
                                className="logout-button"
                                onClick={logoutUser}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive ? 'active' : ''
                                }
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    isActive ? 'active' : ''
                                }
                            >
                                Register
                            </NavLink>
                        </>
                    )}

                </div>

            </nav>

        </div>
    )
}

export default Navbar