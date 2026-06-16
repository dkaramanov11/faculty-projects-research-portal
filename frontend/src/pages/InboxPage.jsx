import InboxList from '../components/inbox/InboxList'
import { useInbox } from '../hooks/useInbox'

function InboxPage() {
    const inbox = useInbox()

    return (
        <div className="inbox-container">

            <section className="projects-header">
                <div>
                    <h1>Inbox</h1>

                    <div className="title-line"></div>

                    <p>
                        Manage project requests and feedback.
                    </p>
                </div>
            </section>

            <InboxList
                items={inbox.items}
                onAccept={inbox.handleAccept}
                onReject={inbox.handleReject}
                onDelete={inbox.handleDelete}
            />

        </div>
    )
}

export default InboxPage