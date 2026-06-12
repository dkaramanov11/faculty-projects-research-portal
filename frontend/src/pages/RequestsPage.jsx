import RequestList from '../components/requests/RequestList'

import { useRequests } from '../hooks/useRequests'

function RequestsPage() {
    const {
        requests,
        handleAccept,
        handleReject
    } = useRequests()

    return (
        <section className="categories-page">
            <div className="page-header">
                <div>
                    <h1>Project Requests</h1>

                    <p>
                        Manage participation and invitation requests.
                    </p>
                </div>
            </div>

            <RequestList
                requests={requests}
                onAccept={handleAccept}
                onReject={handleReject}
            />
        </section>
    )
}

export default RequestsPage