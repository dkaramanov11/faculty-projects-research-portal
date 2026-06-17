function EditProfileModal({
                              isOpen,
                              onClose,
                              form,
                              onChange,
                              onSubmit
                          }) {
    if (!isOpen) {
        return null
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Edit Profile</h2>

                    <button
                        type="button"
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={onSubmit}>
                    <input
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={onChange}
                        required
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={onChange}
                        required
                    />

                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={onChange}
                        required
                    />

                    <input
                        name="surname"
                        placeholder="Surname"
                        value={form.surname}
                        onChange={onChange}
                        required
                    />

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button type="submit">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfileModal