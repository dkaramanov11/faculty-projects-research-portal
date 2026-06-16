import InboxCard from './InboxCard'

function InboxList({
                       items,
                       onAccept,
                       onReject,
                       onDelete
                   }) {
    if (items.length === 0) {
        return (
            <div className="details-card">
                <p>No inbox items yet.</p>
            </div>
        )
    }

    return (
        <div className="request-list">
            {items.map(item => (
                <InboxCard
                    key={item.id}
                    item={item}
                    onAccept={onAccept}
                    onReject={onReject}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export default InboxList