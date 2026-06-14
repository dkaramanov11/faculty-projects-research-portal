import ProjectForm from '../../project/ProjectForm.jsx'

function EditProjectModal({
                              isOpen,
                              project,
                              form,
                              categories,
                              onChange,
                              onSubmit,
                              onClose
                          }) {
    if (!isOpen) {
        return null
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Edit Project</h2>

                    <button
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <ProjectForm
                    form={form}
                    editingId={project.id}
                    categories={categories}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    onCancel={onClose}
                />
            </div>
        </div>
    )
}

export default EditProjectModal