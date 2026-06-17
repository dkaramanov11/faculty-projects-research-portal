function AdminProjectApprovalPanel({ onApprove, onReject }) {
    return (
        <div className="details-card admin-approval-panel">
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