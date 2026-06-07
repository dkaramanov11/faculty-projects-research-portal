import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar">
            <h2>Faculty Portal</h2>

            <div className="nav-links">
                <Link to="/projects">Projects</Link>
                <Link to="/categories">Categories</Link>
                <Link to="/users">Users</Link>
            </div>
        </nav>
    )
}

export default Navbar