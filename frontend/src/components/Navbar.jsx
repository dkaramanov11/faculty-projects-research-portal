import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const { user, logoutUser } = useAuth()

    return (
        <nav className="navbar">
            <h2>Faculty Projects Portal</h2>

            <div className="nav-links">
                <Link to="/projects">Projects</Link>
                <Link to="/categories">Categories</Link>
                <Link to="/users">Users</Link>

                {user ? (
                    <>
                        <Link to="/profile" className="nav-user">
                            {user.full_name}
                        </Link>

                        <button className="logout-button" onClick={logoutUser}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}

                {user && <Link to="/requests">Requests</Link>}

            </div>
        </nav>
    )
}

export default Navbar