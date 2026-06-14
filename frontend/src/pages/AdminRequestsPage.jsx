import AdminProjectRequestCard from '../components/admin/AdminProjectRequestCard'
import { useAdminProjectRequests } from '../hooks/useAdminProjectRequests'

function AdminRequestsPage() {
    const adminRequests = useAdminProjectRequests()

    return (
        <div className="container">

            <section className="projects-header">
                <div>
                    <h1>Admin Requests</h1>

                    <div className="title-line"></div>

                    <p>
                        Review project creation requests.
                    </p>
                </div>
            </section>

            <div className="request-list">
                {adminRequests.requests.length === 0 ? (
                    <div className="details-card">
                        <p>No admin requests yet.</p>
                    </div>
                ) : (
                    adminRequests.requests.map(request => (
                        <AdminProjectRequestCard
                            key={request.id}
                            request={request}
                            onApprove={adminRequests.handleApprove}
                            onReject={adminRequests.handleReject}
                            onDelete={adminRequests.handleDelete}
                        />
                    ))
                )}
            </div>

        </div>
    )
}

export default AdminRequestsPage