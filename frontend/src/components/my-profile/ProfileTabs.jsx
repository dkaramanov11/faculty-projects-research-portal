function ProfileTabs({ profile }) {
    return (
        <div className="project-tabs">
            <button
                className={profile.activeTab === 'created' ? 'active-tab' : ''}
                onClick={() => profile.setActiveTab('created')}
            >
                My Projects ({profile.createdProjects.length})
            </button>

            <button
                className={profile.activeTab === 'participating' ? 'active-tab' : ''}
                onClick={() => profile.setActiveTab('participating')}
            >
                Participating Projects ({profile.participatingProjects.length})
            </button>

            <button
                className={profile.activeTab === 'pending' ? 'active-tab' : ''}
                onClick={() => profile.setActiveTab('pending')}
            >
                Pending Projects ({profile.pendingProjects.length})
            </button>
        </div>
    )
}

export default ProfileTabs