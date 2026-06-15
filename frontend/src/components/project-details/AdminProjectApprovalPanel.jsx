function AdminProjectApprovalPanel({ onApprove, onReject }) {
    return (
        <div className="details-card admin-approval-panel">
            <div>
                <h2>Project waiting for approval</h2>
                <p>Review this project and decide whether it should be published.</p>
            </div>

            <div className="admin-approval-actions">
                <button type="button" onClick={onApprove}>
                    Approve Project
                </button>

                <button type="button" className="danger" onClick={onReject}>
                    Reject Project
                </button>
            </div>
        </div>
    )
}

export default AdminProjectApprovalPanel