import AdminProjectRequestCard from '../components/admin/AdminProjectRequestCard'
import AdminProfessorRequestCard from '../components/admin/AdminProfessorRequestCard'

import { useAdminProjectRequests } from '../hooks/useAdminProjectRequests'
import { useAdminProfessorRequests } from '../hooks/useAdminProfessorRequests'

function AdminRequestsPage() {
    const projectRequests = useAdminProjectRequests()
    const professorRequests = useAdminProfessorRequests()
    console.log(projectRequests)
    return (
        <div className="container">
            <section className="projects-header">
                <div>
                    <h1>Admin Requests</h1>
                    <div className="title-line"></div>
                    <p>Review project creation and professor role requests.</p>
                </div>
            </section>

            <section className="details-card-admin">
                <h2>Project Creation Requests</h2>

                <div className="request-list">
                    {projectRequests.requests.length === 0 ? (
                        <p>No project creation requests yet.</p>
                    ) : (
                        projectRequests.requests.map(request => (
                            <AdminProjectRequestCard
                                key={request.id}
                                request={request}
                                onApprove={projectRequests.handleApprove}
                                onReject={projectRequests.handleReject}
                                onDelete={projectRequests.handleDelete}
                            />
                        ))
                    )}
                </div>
            </section>

            <section className="details-card">
                <h2>Professor Role Requests</h2>

                <div className="request-list">
                    {professorRequests.requests.length === 0 ? (
                        <p>No professor role requests yet.</p>
                    ) : (
                        professorRequests.requests.map(request => (
                            <AdminProfessorRequestCard
                                key={request.id}
                                request={request}
                                onApprove={professorRequests.handleApprove}
                                onReject={professorRequests.handleReject}
                                onDelete={professorRequests.handleDelete}
                            />
                        ))
                    )}
                </div>
            </section>
        </div>
    )
}

export default AdminRequestsPage